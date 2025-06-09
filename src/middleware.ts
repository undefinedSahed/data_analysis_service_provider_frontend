// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Bypass static files, _next, and public routes
    if (
        pathname.startsWith("/_next") ||
        /\.(.*)$/.test(pathname) ||
        pathname.startsWith("/public")
    ) {
        return NextResponse.next();
    }

    // Try to get a valid session token (or null if not logged in)
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    // If user is not logged in and tries to access protected pages
    if (!token && (pathname.startsWith("/account") || pathname.startsWith("/checkout") || pathname.startsWith("/dashboard"))) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    // If the user is logged in but tries to access auth pages, redirect them
    const publicAuthPages = ["/login", "/signup", "/forgot-password", "/verify-otp", "reset-password"];
    if (token && publicAuthPages.some(page => pathname.startsWith(page))) {
        // Redirect authenticated users away from login/register
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Restrict /dashboard to only admin users
    if (pathname.startsWith("/dashboard") && token?.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }


    if (pathname.startsWith("/account") && token?.role !== "user") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // All other routes are allowed
    return NextResponse.next();
}

// Apply this middleware to these routes
export const config = {
    matcher: [
        "/account/:path*",
        "/checkout/:path*",
        "/dashboard/:path*",
        "/login",
        "/register",
        "/verify",
        "/forgot-password",
    ],
};
