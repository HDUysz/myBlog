import { NextRequest } from "next/server";
import { handleRootRedirect } from "./lib/redirect";

export const config = {
  matcher: [
    "/",
    "/home/:path*",
    "/life/:path*",
    "/tech/:path*",
  ],
}

export function proxy(request: NextRequest) {
  return handleRootRedirect(request);
}