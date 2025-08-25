"use client";

type SkillBadgeProps = {
  name: string;
};

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <div
      className="
        skill-card
        border border-border
        bg-white/65 dark:bg-zinc-900/55
        backdrop-blur-sm
        shadow-soft
        px-4 py-3
        flex items-center justify-center
        select-none
        transition
        transform-gpu
        hover:-translate-y-0.5
        hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]
      "
      title={name}
    >
      <span className="text-sm md:text-base font-medium tracking-wide transition-transform duration-300 will-change-transform hover:scale-[1.03]">
        {name}
      </span>
    </div>
  );
}