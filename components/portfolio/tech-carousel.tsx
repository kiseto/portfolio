"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Workflow } from "lucide-react";
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

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BrandTech = {
  name: string;
  icon: SimpleIcon;
  neutral?: boolean;
};

type LucideTech = {
  name: string;
  lucide: true;
};

type Tech = BrandTech | LucideTech;

const technologies: Tech[] = [
  { name: "Next.js", icon: siNextdotjs, neutral: true },
  { name: "React", icon: siReact },
  { name: "Vue.js", icon: siVuedotjs },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Express", icon: siExpress, neutral: true },
  { name: "PHP", icon: siPhp },
  { name: "MySQL", icon: siMysql },
  { name: "Firebase", icon: siFirebase },
  { name: "Flutter", icon: siFlutter },
  { name: "DevOps Practices", lucide: true },
];

function isBrandTech(tech: Tech): tech is BrandTech {
  return "icon" in tech;
}

function TechLogo({ tech }: { tech: Tech }) {
  if (!isBrandTech(tech)) {
    return <Workflow aria-hidden="true" className="size-16 text-foreground sm:size-20" />;
  }

  const color = tech.neutral ? undefined : `#${tech.icon.hex}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("size-16 sm:size-20", tech.neutral && "text-foreground")}
      style={color ? { color } : undefined}
    >
      <path fill="currentColor" d={tech.icon.path} />
    </svg>
  );
}

export function TechCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollCarousel(direction: -1 | 1) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left: direction * Math.min(scroller.clientWidth * 0.8, 520),
      behavior: "smooth",
    });
  }

  return (
    <div className="border-y border-border">
      <div className="flex items-center justify-end gap-2 border-b border-border px-5 py-3 sm:px-8">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Previous technologies"
          onClick={() => scrollCarousel(-1)}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Next technologies"
          onClick={() => scrollCarousel(1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-5 py-12 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-12 sm:px-8 sm:py-14 [&::-webkit-scrollbar]:hidden"
      >
        {technologies.map((tech) => (
          <article
            key={tech.name}
            className="flex min-w-32 snap-start flex-col items-center justify-center gap-4 text-center sm:min-w-40"
          >
            <TechLogo tech={tech} />
            <h3 className="text-sm font-medium leading-5 text-foreground">
              {tech.name}
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
}
