"use client";

import Image from "next/image";

type Project = { name: string; url: string; cover?: string };

export default function ProjectCard({ project }: { project: Project }) {
  const { name, url, cover } = project;

  // add inside the component, after const { name, url, cover } = project;
function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - rect.left}px`);
  el.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group relative overflow-hidden rounded-2xl border border-border
        bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm shadow-soft
        transition-transform transform-gpu hover:-translate-y-0.5
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600
      "
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={cover || "/placeholder-cover.jpg"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={false}
        />
        {/* soft gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
      </div>

      <div className="p-4 flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold">{name}</h3>
        <span className="opacity-60 transition group-hover:opacity-100">↗</span>
      </div>

      {/* subtle hover glow */}
      <div className="pointer-events-none absolute -inset-8 opacity-0 group-hover:opacity-100 transition
                      [background:radial-gradient(240px_circle_at_var(--x,50%)_var(--y,50%),rgba(99,102,241,0.12),transparent_60%)]" />
    </a>
  );
}