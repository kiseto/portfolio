import { SectionHeading } from "@/components/portfolio/section-heading";

const educationItems = [
  {
    school: "National College of Science and Technology - Cavite",
    program: "BS in Information Technology",
    date: "Expected Graduation: 2027",
  },
  {
    school: "Polytechnic University of the Philippines - Sta. Mesa",
    program: "Senior High School, TVL/ICT Strand",
    date: "Graduated: 2022",
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
        subtitle="Academic background focused on practical software systems."
      />

      <div className="mt-6 grid gap-4">
        {educationItems.map((item) => (
          <article
            key={item.school}
            className="rounded-md border border-border bg-card/30 p-4 sm:p-5"
          >
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
              <div className="min-w-0">
                <h3 className="text-xl font-extrabold leading-tight text-foreground sm:text-2xl">
                  {item.school}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                  {item.program}
                </p>
              </div>

              <p className="font-mono text-xs leading-5 text-muted-foreground sm:pt-1 sm:text-right">
                {item.date}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-border bg-background p-4 sm:p-5">
        <h3 className="font-mono text-xs font-medium uppercase leading-none text-muted-foreground">
          Relevant Focus
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <span
              key={area}
              className="rounded-md border border-border bg-muted px-3 py-2 text-xs font-medium leading-none text-foreground sm:text-sm"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
