"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";
import { siGithub } from "simple-icons";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  type: string;
  stack: string;
  role: string;
  description: string;
  githubUrl: string;
  imageSrc?: string;
};

function ProjectImage({ project }: { project: Project }) {
  return (
    <div className="relative flex aspect-[16/10] min-h-56 items-center justify-center overflow-hidden rounded-md border border-border bg-card text-sm font-medium text-muted-foreground">
      {project.imageSrc ? (
        <Image
          src={project.imageSrc}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 80vw, 90vw"
          className="object-cover"
        />
      ) : (
        <span>no image</span>
      )}
    </div>
  );
}

function ProjectMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[3.25rem_1rem_minmax(0,1fr)] gap-3 text-sm leading-6 sm:text-base">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-muted-foreground">|</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}

function ProjectActions({
  project,
  isOpen,
}: {
  project: Project;
  isOpen: boolean;
}) {
  const actionClass =
    "h-10 min-w-32 gap-2 border-border bg-muted text-foreground hover:bg-muted/80 sm:h-11";

  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button" variant="outline" disabled className={actionClass}>
        <FileText className="size-4" />
        case study
      </Button>
      <Button asChild variant="outline" className={actionClass}>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          tabIndex={isOpen ? undefined : -1}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
            <path fill="currentColor" d={siGithub.path} />
          </svg>
          github
        </a>
      </Button>
      <Button type="button" variant="outline" disabled className={actionClass}>
        <ExternalLink className="size-4" />
        live
      </Button>
    </div>
  );
}

function ProjectCard({
  project,
  isOpen,
  onToggle,
}: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const detailsId = `${project.slug}-details`;

  return (
    <article className="relative overflow-hidden rounded-md border border-border bg-card/30">
      <button
        type="button"
        aria-label={isOpen ? `Collapse ${project.title}` : `Expand ${project.title}`}
        aria-expanded={isOpen}
        aria-controls={detailsId}
        className="absolute right-5 top-5 z-10 rounded-md p-1 text-foreground transition-colors duration-200 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:right-7 sm:top-7"
        onClick={onToggle}
      >
        <ChevronDown
          className={cn(
            "size-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        )}
      >
        <div className="overflow-hidden">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 p-5 pr-14 text-left transition-colors duration-200 hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-7 sm:pr-16"
            aria-expanded={isOpen}
            aria-controls={detailsId}
            tabIndex={isOpen ? -1 : undefined}
            onClick={onToggle}
          >
            <span className="min-w-0 space-y-2">
              <span className="block text-2xl font-extrabold leading-tight text-foreground">
                {project.title}
              </span>
              <span className="block text-base leading-6 text-muted-foreground">
                {project.summary}
              </span>
            </span>
          </button>
        </div>
      </div>

      <div
        id={detailsId}
        aria-hidden={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "grid gap-7 p-5 pr-14 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-7 sm:pr-16 md:grid-cols-[minmax(250px,0.85fr)_minmax(0,1.15fr)] md:gap-8 lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)] lg:gap-10",
              isOpen ? "translate-y-0 scale-100" : "-translate-y-2 scale-[0.99]"
            )}
          >
            <ProjectImage project={project} />

            <div className="min-w-0 space-y-5 md:space-y-6">
              <div className="space-y-2">
                <h3 className="max-w-[34rem] pr-8 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
                  {project.title}
                </h3>
              </div>

              <div className="space-y-3">
                <ProjectMeta label="type" value={project.type} />
                <ProjectMeta label="stack" value={project.stack} />
                <ProjectMeta label="role" value={project.role} />
              </div>

              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                {project.description}
              </p>

              <ProjectActions project={project} isOpen={isOpen} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectsAccordion({ projects }: { projects: Project[] }) {
  const [openProjects, setOpenProjects] = useState<Set<string>>(
    () => new Set(projects[0] ? [projects[0].slug] : [])
  );

  return (
    <div className="mt-9 space-y-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          isOpen={openProjects.has(project.slug)}
          onToggle={() => {
            setOpenProjects((current) => {
              const next = new Set(current);

              if (next.has(project.slug)) {
                next.delete(project.slug);
              } else {
                next.add(project.slug);
              }

              return next;
            });
          }}
        />
      ))}
    </div>
  );
}
