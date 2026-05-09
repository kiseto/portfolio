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
            drake.sekito
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
          className="scroll-mt-24 px-5 py-12 sm:px-8 lg:px-12"
        >
          <SectionHeading
            title="#about"
            subtitle="Building practical systems for real workflows."
          />

          <p className="mt-6 max-w-4xl text-base leading-6 text-foreground">
            I build reservation, enrollment, ERP-style, and task management
            systems using Next.js, React, Vue.js, Tailwind CSS, Node.js, and
            Express, with experience in MySQL and Firebase. I am continuously
            learning DevOps practices to build more efficient and maintainable
            applications.
          </p>

          <CodeTerminal title="about.json" className="mt-6 max-w-3xl">
            <span>{"{"}</span>
            {"\n  "}
            <span className="text-muted-foreground">&quot;focus&quot;</span>
            <span>: </span>
            <span className="text-[#7dd36f]">
              &quot;workflow-based web systems&quot;
            </span>
            <span>,</span>
            {"\n  "}
            <span className="text-muted-foreground">&quot;stack&quot;</span>
            <span>: [</span>
            <span className="text-[#7dd36f]">&quot;next.js&quot;</span>
            <span>, </span>
            <span className="text-[#7dd36f]">&quot;vue.js&quot;</span>
            <span>, </span>
            <span className="text-[#7dd36f]">&quot;node.js&quot;</span>
            <span>, </span>
            <span className="text-[#7dd36f]">&quot;express&quot;</span>
            <span>],</span>
            {"\n  "}
            <span className="text-muted-foreground">&quot;database&quot;</span>
            <span>: [</span>
            <span className="text-[#7dd36f]">&quot;mysql&quot;</span>
            <span>, </span>
            <span className="text-[#7dd36f]">&quot;firebase&quot;</span>
            <span>],</span>
            {"\n  "}
            <span className="text-muted-foreground">&quot;learning&quot;</span>
            <span>: </span>
            <span className="text-[#7dd36f]">&quot;devops&quot;</span>
            {"\n"}
            <span>{"}"}</span>
          </CodeTerminal>
        </section>

        <SectionDivider />

        <section id="tech-stack" className="scroll-mt-24">
          <div className="px-5 py-12 sm:px-8 lg:px-12">
            <SectionHeading
              title="#tech-stack"
              subtitle="Technologies I use to build practical systems."
            />
          </div>

          <TechCarousel />

          <div className="px-5 py-9 sm:px-8 lg:px-12">
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
