import { ExternalLink, Mail, MapPin } from "lucide-react";
import { siGithub } from "simple-icons";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { Button } from "@/components/ui/button";

const contactDetails = [
  { label: "email", value: "kisetodrake@gmail.com" },
  { label: "method", value: "Email" },
  { label: "location", value: "Philippines" },
  { label: "timezone", value: "UTC+8 / Philippines" },
  {
    label: "open to",
    value: "Available for freelance and student developer opportunities.",
  },
];

function ContactMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[4.5rem_0.75rem_minmax(0,1fr)] gap-x-2 gap-y-1 text-sm leading-6 sm:grid-cols-[5rem_1rem_minmax(0,1fr)] sm:gap-3 sm:text-base">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-muted-foreground">|</span>
      <span className="min-w-0 break-words text-muted-foreground">
        {value}
      </span>
    </div>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 px-5 py-12 sm:px-8 lg:px-12"
    >
      <SectionHeading
        title="#contact"
        subtitle="Have a workflow that needs a system? Let's build something practical."
      />

      <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.75fr)]">
        <article className="rounded-md border border-border bg-card/30 p-4 sm:p-5">
          <div className="space-y-3">
            {contactDetails.map((detail) => (
              <ContactMeta
                key={detail.label}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </div>
        </article>

        <article className="rounded-md border border-border bg-background p-4 sm:p-5">
          <div className="flex items-center gap-2 font-mono text-xs font-medium uppercase leading-none text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            Contact Links
          </div>

          <div className="mt-4 grid gap-3">
            <Button asChild className="h-10 w-full justify-start gap-2">
              <a href="mailto:kisetodrake@gmail.com">
                <Mail className="size-4" aria-hidden="true" />
                Email
              </a>
            </Button>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              <Button
                asChild
                variant="outline"
                className="h-10 w-full justify-start gap-2"
              >
                <a
                  href="https://github.com/kiseto"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4"
                  >
                    <path fill="currentColor" d={siGithub.path} />
                  </svg>
                  GitHub
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-10 w-full justify-start gap-2"
              >
                <a
                  href="https://www.linkedin.com/in/drake-sekito-804837408/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
