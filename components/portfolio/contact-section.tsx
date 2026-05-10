import { Mail } from "lucide-react";

import { PhilippinesTime } from "@/components/portfolio/philippines-time";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    label: "github",
    href: "https://github.com/kiseto",
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/drake-sekito-804837408/",
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 px-5 py-12 font-sans sm:px-8 lg:px-12"
    >
      <div className="max-w-4xl">
        <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl lg:text-5xl">
          Have a workflow that needs a system?
          <br />
          <span className="font-extrabold">Let&apos;s build something practical.</span>
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-6 text-muted-foreground sm:text-lg">
          Available for freelance and student developer opportunities.
        </p>

        <Button asChild variant="outline" size="lg" className="mt-7 px-4">
          <a href="mailto:kisetodrake@gmail.com">
            <Mail className="size-4" aria-hidden="true" />
            Email me
          </a>
        </Button>
      </div>

      <div className="mt-12 border-t border-border pt-5 sm:mt-14">
        <div className="flex flex-col gap-3 text-sm leading-6 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {link.label}
              </a>
            ))}
          </div>

          <PhilippinesTime className="sm:text-right" />
        </div>
      </div>
    </section>
  );
}
