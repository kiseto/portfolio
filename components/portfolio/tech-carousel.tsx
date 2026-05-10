"use client";

import { useMemo } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { Workflow } from "lucide-react";
import {
  siExpress,
  siFirebase,
  siFlutter,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siReact,
  siTailwindcss,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

type BrandTech = {
  name: string;
  icon: SimpleIcon;
};

type LucideTech = {
  name: string;
  lucide: true;
};

type Tech = BrandTech | LucideTech;

const technologies: Tech[] = [
  { name: "Next.js", icon: siNextdotjs },
  { name: "React", icon: siReact },
  { name: "Vue.js", icon: siVuedotjs },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Express", icon: siExpress },
  { name: "PHP", icon: siPhp },
  { name: "MySQL", icon: siMysql },
  { name: "Firebase", icon: siFirebase },
  { name: "Flutter", icon: siFlutter },
  { name: "DevOps Practices", lucide: true },
];

const carouselOptions = {
  align: "start",
  dragFree: true,
  loop: true,
} satisfies NonNullable<Parameters<typeof useEmblaCarousel>[0]>;

const autoScrollOptions = {
  direction: "forward",
  playOnInit: true,
  speed: 0.8,
  startDelay: 0,
  stopOnInteraction: false,
} satisfies NonNullable<Parameters<typeof AutoScroll>[0]>;

function isBrandTech(tech: Tech): tech is BrandTech {
  return "icon" in tech;
}

function TechLogo({ tech }: { tech: Tech }) {
  const iconClass = "size-12 text-muted-foreground sm:size-16";

  if (!isBrandTech(tech)) {
    return (
      <Workflow
        aria-hidden="true"
        className={iconClass}
      />
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={iconClass}
    >
      <path fill="currentColor" d={tech.icon.path} />
    </svg>
  );
}

export function TechCarousel() {
  const autoScroll = useMemo(() => AutoScroll(autoScrollOptions), []);
  const plugins = useMemo(() => [autoScroll], [autoScroll]);
  const [emblaRef] = useEmblaCarousel(carouselOptions, plugins);
  const borderGradientClass =
    "pointer-events-none absolute inset-x-0 z-10 h-px bg-[linear-gradient(to_right,transparent,var(--border)_4rem,var(--border)_calc(100%_-_4rem),transparent)] sm:bg-[linear-gradient(to_right,transparent,var(--border)_7rem,var(--border)_calc(100%_-_7rem),transparent)]";

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className={`${borderGradientClass} top-0`} />
      <div aria-hidden="true" className={`${borderGradientClass} bottom-0`} />
      <div
        ref={emblaRef}
        className="overflow-hidden px-5 py-12 sm:px-8 sm:py-14"
      >
        <div className="flex touch-pan-y gap-8 will-change-transform sm:gap-12">
          {technologies.map((tech) => (
            <article
              key={tech.name}
              className="flex min-w-0 shrink-0 basis-28 flex-col items-center justify-center gap-4 text-center sm:basis-36"
            >
              <TechLogo tech={tech} />
              <h3 className="text-sm font-medium leading-5 text-foreground">
                {tech.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-px left-0 z-10 w-16 bg-[linear-gradient(to_right,var(--background),transparent)] sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-px right-0 z-10 w-16 bg-[linear-gradient(to_left,var(--background),transparent)] sm:w-28"
      />
    </div>
  );
}
