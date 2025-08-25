"use client";
import { useCallback } from "react";

type Plan = {
  name: string;
  features: string; // newline separated
  note?: string;
};

export default function ServiceCard({ plan }: { plan: Plan }) {
  const items = plan.features.split("\n").map(s => s.trim()).filter(Boolean);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      onMouseMove={onMove}
      className="
        service-card border border-border shadow-soft backdrop-blur-md
        transition-transform transform-gpu hover:-translate-y-0.5
      "
    >
      <div className="p-6 md:p-7">
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
            {plan.name} <span className="opacity-50 text-sm md:text-base">plan</span>
          </h3>
          {/* badge vibe */}
          <span className="text-xs px-2 py-1 rounded-full border border-border opacity-70">
            Clean • Secure
          </span>
        </div>

        <div className="mt-4 grid gap-2">
          <ul className="service-list grid gap-2">
            {items.map((it, i) => (
              <li key={i} className="service-item">
                <span className="service-dot" />
                <span className="text-sm md:text-[15px] leading-6">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}