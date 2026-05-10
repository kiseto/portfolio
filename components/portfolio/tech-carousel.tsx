"use client";

import { useEffect, useRef } from "react";
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

const AUTO_SCROLL_SPEED = 0.045;
const LOOP_GROUPS = [0, 1, 2] as const;

function getLoopWidth(group: HTMLDivElement | null) {
  return group?.getBoundingClientRect().width ?? 0;
}

function normalizeOffset(offset: number, loopWidth: number) {
  if (!loopWidth) {
    return offset;
  }

  const normalized = offset % loopWidth;

  if (normalized < 0) {
    return normalized + loopWidth;
  }

  return normalized;
}

function setTrackOffset(track: HTMLDivElement, offset: number) {
  track.style.transform = `translate3d(${-offset}px, 0, 0)`;
}

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
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const borderGradientClass =
    "pointer-events-none absolute inset-x-0 z-10 h-px bg-[linear-gradient(to_right,transparent,var(--border)_4rem,var(--border)_calc(100%_-_4rem),transparent)] sm:bg-[linear-gradient(to_right,transparent,var(--border)_7rem,var(--border)_calc(100%_-_7rem),transparent)]";

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const measureAndNormalize = () => {
      const loopWidth = getLoopWidth(groupRef.current);

      if (loopWidth) {
        offsetRef.current = normalizeOffset(offsetRef.current, loopWidth);
        setTrackOffset(track, offsetRef.current);
      }
    };

    measureAndNormalize();

    let animationFrame = 0;
    let lastFrameTime = performance.now();
    const resizeObserver = new ResizeObserver(measureAndNormalize);

    if (groupRef.current) {
      resizeObserver.observe(groupRef.current);
    }

    const tick = (time: number) => {
      const elapsed = time - lastFrameTime;
      lastFrameTime = time;
      const loopWidth = getLoopWidth(groupRef.current);

      if (loopWidth) {
        offsetRef.current = normalizeOffset(
          offsetRef.current + elapsed * AUTO_SCROLL_SPEED,
          loopWidth,
        );
        setTrackOffset(track, offsetRef.current);
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    window.addEventListener("resize", measureAndNormalize);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureAndNormalize);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className={`${borderGradientClass} top-0`} />
      <div aria-hidden="true" className={`${borderGradientClass} bottom-0`} />
      <div className="overflow-hidden px-5 py-12 sm:px-8 sm:py-14">
        <div ref={trackRef} className="flex w-max will-change-transform">
          {LOOP_GROUPS.map((group) => (
            <div
              key={group}
              ref={group === 0 ? groupRef : undefined}
              aria-hidden={group !== 1}
              className="flex shrink-0 gap-8 pr-8 sm:gap-12 sm:pr-12"
            >
              {technologies.map((tech) => (
                <article
                  key={`${group}-${tech.name}`}
                  className="flex min-w-28 flex-col items-center justify-center gap-4 text-center sm:min-w-36"
                >
                  <TechLogo tech={tech} />
                  <h3 className="text-sm font-medium leading-5 text-foreground">
                    {tech.name}
                  </h3>
                </article>
              ))}
            </div>
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
