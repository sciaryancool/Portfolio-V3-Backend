import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import SkillBadge from "@/components/SkillBadge";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";

// Map project names to cover images (frontend-only)
const projectCovers: Record<string, string> = {
  "Silence": "/covers/silence.png",
  "3D Projects": "/covers/3d.png",
  "Portfolio V1": "/covers/website V1.png",
  "krixel studio": "/covers/krixelstudio.png",
};

// Resolve a reliable base URL for server-side fetches
function getBase() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_EXTERNAL_URL) return process.env.RENDER_EXTERNAL_URL as string;
  return "http://localhost:3000";
}

// Robust JSON fetcher to avoid “Unexpected end of JSON input”
async function fetchJson<T>(url: string, fallback: T): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    console.error(`[getData] ${url} -> ${res.status} ${res.statusText}`);
    return fallback;
  }
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch (e) {
    console.error(`[getData] JSON parse failed for ${url}. Body: ${text.slice(0, 400)}…`);
    return fallback;
  }
}

async function getData() {
  const base = getBase();
  const [site, skills, projects, services] = await Promise.all([
    fetchJson(`${base}/api/site`, null),
    fetchJson(`${base}/api/skills`, [] as any[]),
    fetchJson(`${base}/api/projects`, [] as any[]),
    fetchJson(`${base}/api/services`, [] as any[]),
  ]);
  return { site, skills, projects, services };
}

export default async function Home(){
  const { site, skills, projects, services } = await getData();

  return (
    <div>
      {/* Nav */}
      <nav className="container py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/aryan.jpeg" alt="Aryan" width={40} height={40} className="rounded-full"/>
          <div className="font-medium">Aryan Kaushik</div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/admin" className="nav-link">Admin</a>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <header className="container mt-6">
        <div className="card p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Web developer</h1>
          <p className="mt-4 text-lg opacity-80">{site?.customHeading}</p>
        </div>
      </header>

      {/* Project Narayan DP */}
      <section className="container mt-10">
        <div className="card overflow-hidden">
          <Image src="/project-n.png" alt="Project Narayan" width={1600} height={900} priority/>
        </div>
      </section>

      {/* Skills */}
      <section className="container mt-10">
        <h2 className="section-title mb-4">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {skills?.map((s: any) => (
            <SkillBadge key={s.id} name={s.name} />
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="container mt-10">
        <h2 className="section-title mb-4">Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects?.map((p: any) => (
            <ProjectCard
              key={p.id}
              project={{ ...p, cover: projectCovers[p.name] }}
            />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container mt-10">
        <h2 className="section-title mb-4">Services</h2>
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {services?.map((pl: any) => (
            <ServiceCard
              key={pl.id}
              plan={{ name: pl.name, features: pl.features }}
            />
          ))}
        </div>

        {/* Shared contact note (take from first service) */}
        {services?.length > 0 && (
          <p className="mt-6 text-center text-sm md:text-base opacity-75">
            {services[0].note}
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="container mt-14 mb-10">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a className="nav-link" href={site?.github} target="_blank">GitHub</a>
            <a className="nav-link" href={site?.x} target="_blank">X</a>
            <a className="nav-link" href={site?.youtube} target="_blank">YouTube</a>
            <a className="nav-link" href={site?.linkedin} target="_blank">LinkedIn</a>
            <a className="nav-link" href={site?.instagram} target="_blank">Instagram</a>
          </div>
          <div className="opacity-80">Version: {site?.version}</div>
          <div className="font-medium">Aryan Kaushik</div>
        </div>
      </footer>
    </div>
  );
}