import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnProtectedArea = req.nextUrl.pathname.startsWith("/recipes/new") || 
                            req.nextUrl.pathname.startsWith("/profile");

  if (isOnProtectedArea && !isLoggedIn) {
    // Redirect unauthenticated traffic back to our login page
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

// Configure exactly which routes trigger the auth check
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};