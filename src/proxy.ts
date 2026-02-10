import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";

export function proxy(request: NextRequest) {
  const { url, cookies } = request;

  const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

  const isAuthPage = url.includes("/auth");

  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL("/decks", url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/sign-in", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
