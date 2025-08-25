import { NextRequest, NextResponse } from "next/server";

/** Allow comma‑separated origins, e.g.:
 *  ALLOWED_ORIGINS="https://aryankaushik.space,https://www.aryankaushik.space"
 */
const ORIGINS = (process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGIN || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

export function corsHeaders(origin: string | null) {
  const isAllowed = origin ? ORIGINS.includes(origin) : false;
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : "null",
    "Access-Control-Allow-Methods": "GET,PUT,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Vary": "Origin",
  };
}

export function handleOptions(req: NextRequest) {
  const headers = corsHeaders(req.headers.get("origin"));
  return new NextResponse(null, { status: 204, headers });
}