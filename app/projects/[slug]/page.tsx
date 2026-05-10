import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { siGithub } from "simple-icons";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getProjectBySlug, projectData } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function getStackItems(stack: string) {
  return stack
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);
}

function ProjectSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
      <h2 className="text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <div className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
        {children}
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return projectData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found | drake.sekito",
    };
  }

  return {
    title: `${project.title} | drake.sekito`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const stackItems = getStackItems(project.stack);
  const galleryImages =
    project.images.length > 0
      ? project.images
      : project.imageSrc
        ? [project.imageSrc]
        : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto min-h-screen w-full max-w-[1000px] border-x border-border">
        <div className="sticky top-0 z-40 border-b border-border bg-background px-5 py-4 sm:px-8 lg:px-12">
          <Link
            href="/#projects"
            className="inline-flex rounded-md text-sm font-medium leading-6 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span aria-hidden="true">&larr;</span> Back to projects
          </Link>
        </div>

        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <h1 className="max-w-4xl text-4xl font-extrabold leading-none tracking-normal text-foreground sm:text-5xl">
            {project.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-primary px-3 py-2 text-xs font-medium leading-none text-primary-foreground sm:text-sm">
              {project.type}
            </span>
            <span className="text-sm font-medium leading-6 text-muted-foreground sm:text-base">
              {project.role}
            </span>
          </div>

          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-muted-foreground sm:text-xl sm:leading-9">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {stackItems.map((technology) => (
              <span
                key={technology}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium leading-5 text-foreground"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        <ProjectSection title="Problem / context">
          <p>{project.problem}</p>
        </ProjectSection>

        <ProjectSection title="What was built / role">
          <p>{project.built}</p>
        </ProjectSection>

        <section className="border-t border-border px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <h2 className="text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
            Screenshot gallery
          </h2>

          {galleryImages.length > 0 ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {galleryImages.map((image, index) => (
                <figure
                  key={image}
                  className="relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-card"
                >
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 440px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-top"
                  />
                </figure>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              No screenshots available.
            </p>
          )}
        </section>

        <ProjectSection title="Key technical decisions / challenges">
          <p>{project.challenges}</p>
        </ProjectSection>

        <section className="border-t border-border px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <h2 className="text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
            Links
          </h2>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild variant="outline" className="h-10 gap-2 px-4">
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
                  <path fill="currentColor" d={siGithub.path} />
                </svg>
                GitHub
              </a>
            </Button>

            {project.liveUrl ? (
              <Button asChild variant="outline" className="h-10 gap-2 px-4">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-4" />
                  Live URL
                </a>
              </Button>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
