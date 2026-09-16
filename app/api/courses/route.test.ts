import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextResponse } from 'next/server';

// Mock the modules
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

// We need to import the mocked modules to change their implementation in tests
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';

describe('POST /api/courses', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 201 and create a course with the provided userId when authenticated', async () => {
    const mockUserId = 'user_123';
    const mockTitle = 'Test Course';
    const mockCourse = { id: 'course_1', title: mockTitle, userId: mockUserId };

    // Setup mocks
    (auth as any).mockReturnValue({ userId: mockUserId });
    (db.course.create as any).mockResolvedValue(mockCourse);

    // Create a mock request
    const req = new Request('http://localhost:3000/api/courses', {
      method: 'POST',
      body: JSON.stringify({ title: mockTitle }),
    });

    const response = await POST(req);

    expect(response.status).toBe(201);

    const data = await response.json();
    expect(data).toEqual(mockCourse);

    expect(db.course.create).toHaveBeenCalledWith({
      data: {
        userId: mockUserId,
        title: mockTitle,
      },
    });
  });

  it('should return 201 and create a course with guest_teacher when not authenticated', async () => {
    const mockTitle = 'Guest Course';
    const mockCourse = { id: 'course_2', title: mockTitle, userId: 'guest_teacher' };

    // Setup mocks - simulate no userId
    (auth as any).mockReturnValue({ userId: null });
    (db.course.create as any).mockResolvedValue(mockCourse);

    // Create a mock request
    const req = new Request('http://localhost:3000/api/courses', {
      method: 'POST',
      body: JSON.stringify({ title: mockTitle }),
    });

    const response = await POST(req);

    expect(response.status).toBe(201);

    const data = await response.json();
    expect(data).toEqual(mockCourse);

    expect(db.course.create).toHaveBeenCalledWith({
      data: {
        userId: 'guest_teacher',
        title: mockTitle,
      },
    });
  });

  it('should return 500 when database fails', async () => {
    const mockUserId = 'user_123';
    const mockTitle = 'Failing Course';

    // Setup mocks
    (auth as any).mockReturnValue({ userId: mockUserId });
    (db.course.create as any).mockRejectedValue(new Error('DB Failure'));

    // Create a mock request
    const req = new Request('http://localhost:3000/api/courses', {
      method: 'POST',
      body: JSON.stringify({ title: mockTitle }),
    });

    const response = await POST(req);

    expect(response.status).toBe(500);
    const text = await response.text();
    expect(text).toBe('Internal Server Error');
  });

  it('should return 500 when JSON body is invalid', async () => {
    const mockUserId = 'user_123';

    // Setup mocks
    (auth as any).mockReturnValue({ userId: mockUserId });

    // Create a mock request with invalid JSON string
    const req = new Request('http://localhost:3000/api/courses', {
      method: 'POST',
      body: 'invalid json{]',
    });

    const response = await POST(req);

    expect(response.status).toBe(500);
    const text = await response.text();
    expect(text).toBe('Internal Server Error');
  });
});
