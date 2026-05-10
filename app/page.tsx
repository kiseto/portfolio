import Image from "next/image";

import { CodeTerminal } from "@/components/portfolio/code-terminal";
import { ContactSection } from "@/components/portfolio/contact-section";
import { EducationSection } from "@/components/portfolio/education-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { SectionDivider } from "@/components/portfolio/section-divider";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { SiteHeader } from "@/components/portfolio/site-header";
import { TechCarousel } from "@/components/portfolio/tech-carousel";

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
            IT Student Developer | Web Systems
          </p>

          <div className="mt-9 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {[
              "Based in the Philippines",
              "Available for freelance",
              "Student Developer",
              "Web Systems",
            ].map((label) => (
              <span
                key={label}
                className="rounded-md bg-primary px-3 py-2 text-xs font-medium leading-none text-primary-foreground sm:text-sm"
              >
                {label}
              </span>
            ))}
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
              <CodeTerminal title="tech-stack.ts" className="max-w-4xl">
                <span className="text-[#f3a6c8]">const</span>
                <span> </span>
                <span className="text-[#c7a8ff]">techStack</span>
                <span> = {"{"}</span>
                {"\n  "}
                <span>frontend: [</span>
                <span className="text-[#7dd36f]">&quot;Next.js&quot;</span>
                <span>, </span>
                <span className="text-[#7dd36f]">&quot;React&quot;</span>
                <span>, </span>
                <span className="text-[#7dd36f]">&quot;Vue.js&quot;</span>
                <span>, </span>
                <span className="text-[#7dd36f]">&quot;Tailwind CSS&quot;</span>
                <span>],</span>
                {"\n  "}
                <span>backend: [</span>
                <span className="text-[#7dd36f]">&quot;Node.js&quot;</span>
                <span>, </span>
                <span className="text-[#7dd36f]">&quot;Express&quot;</span>
                <span>, </span>
                <span className="text-[#7dd36f]">&quot;PHP&quot;</span>
                <span>],</span>
                {"\n  "}
                <span>database: [</span>
                <span className="text-[#7dd36f]">&quot;MySQL&quot;</span>
                <span>, </span>
                <span className="text-[#7dd36f]">&quot;Firebase&quot;</span>
                <span>],</span>
                {"\n  "}
                <span>mobile: [</span>
                <span className="text-[#7dd36f]">&quot;Flutter&quot;</span>
                <span>],</span>
                {"\n  "}
                <span>learning: [</span>
                <span className="text-[#7dd36f]">&quot;DevOps Practices&quot;</span>
                <span>],</span>
                {"\n"}
                <span>{"}"}</span>
              </CodeTerminal>
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
