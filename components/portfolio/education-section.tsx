import { SectionHeading } from "@/components/portfolio/section-heading";

const educationItems = [
  {
    meta: "2027 / expected",
    school: "National College of Science and Technology - Cavite",
    program: "BS in Information Technology",
    description:
      "Built a deeper foundation in databases, version control, frameworks, authentication, security, and programming fundamentals.",
  },
  {
    meta: "2022 / graduated",
    school: "Polytechnic University of the Philippines - Sta. Mesa",
    program: "Senior High School, TVL/ICT Strand",
    description:
      "Started with HTML, CSS, and JavaScript, which sparked my interest in web design and development.",
  },
];

const focusAreas = [
  "Web systems",
  "Database-backed applications",
  "System analysis and design",
  "Capstone development",
];

export function EducationSection() {
  return (
    <section
      id="education"
      className="scroll-mt-24 px-5 py-12 sm:px-8 lg:px-12"
    >
      <SectionHeading
        title="#education"
        subtitle="Academic background shaped around practical software systems."
      />

      <div className="mt-9 border-y border-border">
        {educationItems.map((item) => (
          <article
            key={item.school}
            className="border-b border-border py-5 last:border-b-0 sm:py-6"
          >
            <p className="font-mono text-xs leading-5 text-muted-foreground">
              {item.meta}
            </p>
            <h3 className="mt-2 text-xl font-extrabold leading-tight text-foreground sm:text-2xl">
              {item.school}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
              {item.program}
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="font-mono text-xs font-medium uppercase leading-none text-muted-foreground">
          Relevant Focus
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <span
              key={area}
              className="rounded-md bg-primary px-3 py-2 text-xs font-medium leading-none text-primary-foreground sm:text-sm"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
