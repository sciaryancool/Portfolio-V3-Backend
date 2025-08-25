import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { corsHeaders, handleOptions } from "@/lib/cors";
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");

export function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

export async function GET(req: NextRequest) {
  const headers = corsHeaders(req.headers.get("origin"));
  const rows = await prisma.skill.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(rows, { headers });
}

export async function PUT(req: NextRequest) {
  const headers = corsHeaders(req.headers.get("origin"));

  const token = req.cookies.get("auth")?.value;
  try { if (!token) throw new Error(); await jwtVerify(token, secret); }
  catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers }); }

  const names: string[] = await req.json();
  await prisma.skill.deleteMany({});
  for (const name of names) {
    await prisma.skill.create({ data: { name } });
  }
  return NextResponse.json({ ok: true }, { headers });
}