import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";

const NO_CACHE = "private, no-cache, no-store, max-age=0, must-revalidate";

function withNoCache(response: NextResponse) {
  response.headers.set("Cache-Control", NO_CACHE);
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  return response;
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/admin/login")
  ) {
    return withNoCache(NextResponse.next());
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const authed = await isAuthenticated(request);
    if (!authed) {
      if (pathname.startsWith("/api/admin")) {
        return withNoCache(
          NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        );
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return withNoCache(NextResponse.redirect(loginUrl));
    }
    return withNoCache(NextResponse.next());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
