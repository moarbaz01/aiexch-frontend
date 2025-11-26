// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";

interface JWTPayloadWithRole extends JWTPayload {
  role?: string;
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("accessToken")?.value;

  // Redirect to home if no token
  if (!token) {
    if (url.pathname !== "/") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Admin-only routes
  if (url.pathname.startsWith("/admin")) {
    try {
      const { payload } = await jwtVerify<JWTPayloadWithRole>(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );

      if (payload.role !== "admin") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    } catch {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
