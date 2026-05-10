import Link from "next/link";

import type { ProjectCardData } from "@/lib/projects";

export type Project = ProjectCardData;

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-md border border-border bg-card/30 p-4 transition-colors duration-200 hover:bg-muted/20 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <h3 className="text-xl font-extrabold leading-tight text-foreground sm:text-2xl">
            {project.title}
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {project.summary}
          </p>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex shrink-0 items-center rounded-md text-sm font-medium leading-6 text-foreground underline-offset-4 transition-colors hover:text-muted-foreground hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:text-base"
          aria-label={`View project ${project.title}`}
        >
          View project <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}

export function ProjectsAccordion({ projects }: { projects: Project[] }) {
  return (
    <div className="w-full space-y-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
