"use client";
import { useState } from "react";

type Tab = { name: string; url: string };

export default function Tabs({ items }: { items: Tab[] }){
  const [active, setActive] = useState(0);
  return (
    <div className="card p-4">
      <div className="flex gap-2 flex-wrap">
        {items.map((t, i) => (
          <button key={t.name}
            className={`btn ${i===active?'bg-zinc-100 dark:bg-zinc-800':''}`}
            onClick={() => {
              setActive(i);
              window.open(t.url, "_blank");
            }}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
