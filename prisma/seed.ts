import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || "sciaryan_log";
  const password = process.env.ADMIN_PASSWORD || "sciaryan_@5314";
  const hash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { username },
    create: { username, password: hash },
    update: {},
  });

  await prisma.siteConfig.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      customHeading: "Crafting calm, fast, production-grade web experiences.",
      version: "v1.0.0",
      github: "https://github.com/aryan",
      x: "https://x.com/aryan",
      youtube: "https://youtube.com/@aryan",
      linkedin: "https://www.linkedin.com/in/aryan",
      instagram: "https://instagram.com/aryan",
    },
    update: {},
  });

  const skills = ["React", "Next.js", "Java", "SpringBoot", "PostgresSQL", "MongoDB", "Docker", "Blender", "Typescript"];
  for (const name of skills) {
    await prisma.skill.upsert({ where: { name }, create: { name }, update: {} });
  }

  const projects = [
    { name: "Silence", url: "https://example.com/silence" },
    { name: "3D Projects", url: "https://example.com/3d" },
    { name: "Portfolio V1", url: "https://example.com/portfolio-v1" },
    { name: "krixel studio", url: "https://example.com/krixel" },
  ];
  for (const p of projects) {
    await prisma.project.upsert({
      where: { name: p.name },
      create: p,
      update: { url: p.url },
    });
  }

  const note = "For prices contact 7818995xxxx or mail at sciaryan77@gmail.com";
  const plans = [
    {
      name: "Basic",
      features: "Static website\nUploaded on subdomain\nSSL\nMalware protection\nMonthly review",
      note,
    },
    {
      name: "Pro",
      features: "Dynamic website\nCustom domain\nBasic backend\nAll features of Basic plan",
      note,
    },
    {
      name: "Plus",
      features: "Full Stack Website\nCustom Domain\nVPS\nAll features of Pro plan",
      note,
    },
    {
      name: "Geek",
      features: "Production Grade Website or WebApp\nCustom Domain\nVPS or AWS as needed\nAll features of Plus plan",
      note,
    },
  ];

  for (const pl of plans) {
    await prisma.servicePlan.upsert({
      where: { name: pl.name },
      create: pl,
      update: { features: pl.features, note: pl.note },
    });
  }
}

main().then(() => prisma.$disconnect());
