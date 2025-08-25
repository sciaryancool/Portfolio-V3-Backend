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
  const cfg = await prisma.siteConfig.findUnique({ where: { id: "singleton" } });
  return NextResponse.json(cfg, { headers });
}

export async function PUT(req: NextRequest) {
  const headers = corsHeaders(req.headers.get("origin"));

  const token = req.cookies.get("auth")?.value;
  try { if (!token) throw new Error(); await jwtVerify(token, secret); }
  catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers }); }

  const body = await req.json();
  const updated = await prisma.siteConfig.update({ where: { id: "singleton" }, data: body });
  return NextResponse.json(updated, { headers });
}