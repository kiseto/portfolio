import Image from "next/image";
import { ArrowDown, Calendar, Code2, Layers } from "lucide-react";

import { ContactSection } from "@/components/portfolio/contact-section";
import { EducationSection } from "@/components/portfolio/education-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { SectionDivider } from "@/components/portfolio/section-divider";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { SiteHeader } from "@/components/portfolio/site-header";
import { TechCarousel } from "@/components/portfolio/tech-carousel";
import { Button } from "@/components/ui/button";

const aboutHighlights = [
  {
    label: "3+",
    description: "years learning web development",
    icon: Calendar,
  },
  {
    label: "4",
    description: "academic and personal projects shipped",
    icon: Layers,
  },
  {
    label: "2",
    description: "sides of the stack, frontend and backend",
    icon: Code2,
  },
];

const skillGroups = [
  {
    category: "Frontend",
    technologies: ["Next.js", "React", "Vue.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    technologies: ["Node.js", "Express", "PHP"],
  },
  {
    category: "Database",
    technologies: ["MySQL", "Firebase"],
  },
  {
    category: "Mobile",
    technologies: ["Flutter"],
  },
  {
    category: "Learning",
    technologies: ["DevOps Practices"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1000px] border-x border-border">
        <section
          id="home"
          className="flex min-h-[calc(100svh-5.5rem)] scroll-mt-24 flex-col items-center justify-center px-5 py-20 text-center sm:px-8 lg:px-12"
        >
          <Image
            src="/images/memoji.png"
            alt="Memoji of Drake Sekito behind a laptop"
            width={800}
            height={800}
            priority
            className="h-auto w-36 object-contain sm:w-44 lg:w-54"
          />

          <h1 className="mt-4 text-4xl font-extrabold leading-none tracking-normal text-foreground sm:text-5xl">
            drake sekito
          </h1>
          <p className="mt-1 text-base leading-6 text-muted-foreground sm:text-lg">
            IT Student Developer | Web Apps & System Design
          </p>

          <div className="mt-9 flex max-w-2xl flex-col items-center gap-5">
            <Button asChild size="lg" className="px-4">
              <a href="#projects">
                See my work
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </section>

        <SectionDivider />

        <section
          id="about"
          className="flex min-h-[calc(100svh-5.5rem)] scroll-mt-24 flex-col px-5 py-12 sm:px-8 lg:px-12"
        >
          <SectionHeading
            title="#about"
            subtitle="Building practical systems for real workflows."
          />

          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="space-y-7">
              <p className="max-w-4xl text-2xl font-semibold leading-9 text-foreground sm:text-3xl sm:leading-10">
                I&apos;m an IT student developer who builds practical web
                systems across both frontend and backend. I enjoy designing
                clean interfaces, structuring user flows, and turning real
                workflows into maintainable applications.
              </p>

              <p className="max-w-4xl text-lg font-medium leading-8 text-muted-foreground sm:text-xl sm:leading-9">
                My experience includes React, Next.js, Vue.js, Tailwind CSS,
                Node.js, Express, MySQL, and Firebase, with a strong interest in
                UI/UX design and system design.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {aboutHighlights.map((highlight) => (
                <article
                  key={highlight.label}
                  className="rounded-md border border-border bg-card/30 p-4 sm:p-5"
                >
                  <highlight.icon
                    className="mb-4 size-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="text-2xl font-extrabold leading-none text-foreground sm:text-3xl">
                    {highlight.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                    {highlight.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        <section
          id="tech-stack"
          className="flex min-h-[calc(100svh-5.5rem)] scroll-mt-24 flex-col"
        >
          <div className="px-5 pt-12 sm:px-8 lg:px-12">
            <SectionHeading
              title="#tech-stack"
              subtitle="Technologies I use to build my projects."
            />
          </div>

          <div className="mt-12 pb-12 sm:mt-16 lg:mt-20">
            <TechCarousel />

            <div className="px-5 pt-9 sm:px-8 lg:px-12">
              <div className="grid max-w-4xl gap-3 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <article
                    key={group.category}
                    className="rounded-md border border-border bg-card/30 p-4 sm:p-5"
                  >
                    <h3 className="text-xs font-medium leading-none text-muted-foreground">
                      {group.category}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium leading-5 text-foreground"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <ProjectsSection />

        <SectionDivider />

        <EducationSection />

        <SectionDivider />

        <ContactSection />
      </main>
    </div>
  );
}
