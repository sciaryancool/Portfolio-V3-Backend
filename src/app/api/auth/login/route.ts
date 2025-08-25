// src/app/api/auth/login/route.ts
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";

const isProd = process.env.NODE_ENV === "production";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = await signToken({ sub: user.id, username: user.username });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("auth", token, {
    httpOnly: true,
    secure: isProd,     // ✅ secure on Render/HTTPS, off on localhost
    sameSite: "lax",
    path: "/",
  });
  return res;
}