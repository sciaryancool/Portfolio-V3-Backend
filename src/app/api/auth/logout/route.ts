// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
const isProd = process.env.NODE_ENV === "production";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("auth", "", {
    httpOnly: true,
    secure: isProd,   // ✅ match login
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}