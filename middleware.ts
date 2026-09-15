import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    "/",
    "/herramientas",
    "/api/uploadthing",
    "/api/market-data"
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
