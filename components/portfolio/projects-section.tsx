import { SectionHeading } from "@/components/portfolio/section-heading";
import { ProjectsAccordion } from "@/components/portfolio/projects-accordion";
import { getProjects } from "@/lib/projects";

export function ProjectsSection() {
  const projects = getProjects();

  return (
    <section
      id="projects"
      className="flex min-h-[calc(100svh-5.5rem)] scroll-mt-24 flex-col px-5 py-12 sm:px-8 lg:px-12"
    >
      <SectionHeading
        title="#projects"
        subtitle="Selected academic and personal work."
      />

      <div className="mt-12 sm:mt-16 lg:mt-20">
        <ProjectsAccordion projects={projects} />
      </div>
    </section>
  );
}
