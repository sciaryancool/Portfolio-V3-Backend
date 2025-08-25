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
  const rows = await prisma.servicePlan.findMany();
  const order = ["Basic", "Pro", "Plus", "Geek"];
  const sorted = rows.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  return NextResponse.json(sorted, { headers });
}

export async function PUT(req: NextRequest) {
  const headers = corsHeaders(req.headers.get("origin"));

  const token = req.cookies.get("auth")?.value;
  try { if (!token) throw new Error(); await jwtVerify(token, secret); }
  catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers }); }

  const rows: { name: string; features: string; note: string }[] = await req.json();
  await prisma.servicePlan.deleteMany({});
  for (const r of rows) {
    await prisma.servicePlan.create({ data: r });
  }
  return NextResponse.json({ ok: true }, { headers });
}