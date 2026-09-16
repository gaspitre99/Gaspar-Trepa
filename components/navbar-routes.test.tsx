import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavbarRoutes from './navbar-routes';

// Mock the next/navigation hooks
const usePathnameMock = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => usePathnameMock(),
}));

// Mock Clerk components
vi.mock('@clerk/nextjs', () => ({
  UserButton: () => <div data-testid="user-button">MockedUserButton</div>,
}));

// Mock Link from Next.js to just render children
vi.mock('next/link', () => {
  return {
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href} data-testid={`link-to-${href}`}>
        {children}
      </a>
    ),
  };
});

describe('NavbarRoutes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders "Salir" button on /teacher routes', () => {
    usePathnameMock.mockReturnValue('/teacher/courses');

    render(<NavbarRoutes />);

    expect(screen.getByText('Salir')).toBeInTheDocument();
    expect(screen.queryByText('Modo profesor')).not.toBeInTheDocument();
  });

  it('renders "Salir" button on /chapter routes (player pages)', () => {
    usePathnameMock.mockReturnValue('/courses/some-course/chapter/some-chapter');

    render(<NavbarRoutes />);

    expect(screen.getByText('Salir')).toBeInTheDocument();
    expect(screen.queryByText('Modo profesor')).not.toBeInTheDocument();
  });

  it('renders "Modo profesor" button on standard routes', () => {
    usePathnameMock.mockReturnValue('/juegos/preciodle');

    render(<NavbarRoutes />);

    expect(screen.getByText('Modo profesor')).toBeInTheDocument();
    expect(screen.queryByText('Salir')).not.toBeInTheDocument();
  });

  it('renders "Modo profesor" button on root route', () => {
    usePathnameMock.mockReturnValue('/');

    render(<NavbarRoutes />);

    expect(screen.getByText('Modo profesor')).toBeInTheDocument();
    expect(screen.queryByText('Salir')).not.toBeInTheDocument();
  });

  it('renders the Clerk UserButton', () => {
     usePathnameMock.mockReturnValue('/');
     render(<NavbarRoutes />);
     expect(screen.getByTestId('user-button')).toBeInTheDocument();
  });
});
