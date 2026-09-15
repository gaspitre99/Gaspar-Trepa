import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

const hasClerkKeys =
  Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
  Boolean(process.env.CLERK_SECRET_KEY);

export default hasClerkKeys
  ? authMiddleware({
      publicRoutes: [
        "/",
        "/herramientas",
        "/api/market-data",
        "/api/uploadthing",
      ],
    })
  : () => NextResponse.next();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
