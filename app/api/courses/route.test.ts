import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// Mock dependencies
vi.mock('@clerk/nextjs', () => ({
  auth: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  db: {
    course: {
      create: vi.fn(),
    },
  },
}));

// Provide a fake global Response implementation for Next.js since standard Node doesn't have it natively in older versions
// In newer node environments, global.Response exists. NextResponse inherits from Response.
// For basic testing of API routes, Next.js provides NextResponse.

describe('Course Creation POST API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockRequest = (body: any) => {
    return {
      json: vi.fn().mockResolvedValue(body),
    } as unknown as Request;
  };

  it('should create a course successfully when authenticated (Happy Path)', async () => {
    const mockUserId = 'test-user-123';
    const mockTitle = 'New Test Course';
    const mockCourse = { id: 'course-1', title: mockTitle, userId: mockUserId };

    vi.mocked(auth).mockReturnValue({ userId: mockUserId } as any);
    vi.mocked(db.course.create).mockResolvedValue(mockCourse as any);

    const req = createMockRequest({ title: mockTitle });
    const response = await POST(req);

    // Verify auth was called
    expect(auth).toHaveBeenCalled();

    // Verify db.course.create was called with correct data
    expect(db.course.create).toHaveBeenCalledWith({
      data: {
        userId: mockUserId,
        title: mockTitle,
      },
    });

    // Verify response
    expect(response.status).toBe(201);

    // In order to check json we might need to parse it if we aren't using a mocked NextResponse
    // Since NextResponse.json returns a Response object
    const responseData = await response.json();
    expect(responseData).toEqual(mockCourse);
  });

  it('should create a course with guest_teacher userId when unauthenticated (Fallback Path)', async () => {
    const mockTitle = 'Guest Course';
    const mockCourse = { id: 'course-2', title: mockTitle, userId: 'guest_teacher' };

    vi.mocked(auth).mockReturnValue({ userId: null } as any);
    vi.mocked(db.course.create).mockResolvedValue(mockCourse as any);

    const req = createMockRequest({ title: mockTitle });
    const response = await POST(req);

    expect(auth).toHaveBeenCalled();

    expect(db.course.create).toHaveBeenCalledWith({
      data: {
        userId: 'guest_teacher',
        title: mockTitle,
      },
    });

    expect(response.status).toBe(201);
    const responseData = await response.json();
    expect(responseData).toEqual(mockCourse);
  });

  it('should return 500 when database creation fails (Error Path)', async () => {
    const mockUserId = 'test-user-456';
    const mockTitle = 'Error Course';

    vi.mocked(auth).mockReturnValue({ userId: mockUserId } as any);
    vi.mocked(db.course.create).mockRejectedValue(new Error('Database error'));

    // Suppress console.log for this specific test so it doesn't clutter output
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const req = createMockRequest({ title: mockTitle });
    const response = await POST(req);

    expect(response.status).toBe(500);
    // Checking NextResponse directly without .text() since the original code uses new NextResponse('Internal Server Error')
    // We can check the status text or text()
    const errorText = await response.text();
    expect(errorText).toBe('Internal Server Error');

    consoleSpy.mockRestore();
  });
});
