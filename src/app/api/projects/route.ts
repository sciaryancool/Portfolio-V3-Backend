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
  const rows = await prisma.project.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, url: true }, // ← keep to existing columns
  });
  return NextResponse.json(rows, { headers });
}

export async function PUT(req: NextRequest) {
  const headers = corsHeaders(req.headers.get("origin"));

  const token = req.cookies.get("auth")?.value;
  try { if (!token) throw new Error(); await jwtVerify(token, secret); }
  catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers }); }

  const rows: { name: string; url: string }[] = await req.json();
  await prisma.project.deleteMany({});
  for (const r of rows) {
    await prisma.project.create({ data: r });
  }
  return NextResponse.json({ ok: true }, { headers });
}