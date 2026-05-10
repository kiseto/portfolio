import { Mail } from "lucide-react";

import { SiteFooter } from "@/components/portfolio/site-footer";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="flex min-h-[calc(100svh-5.5rem)] scroll-mt-24 flex-col px-5 pb-5 pt-12 font-sans sm:px-8 lg:px-12"
    >
      <div className="flex flex-1 flex-col justify-center">
        <div className="max-w-4xl">
          <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl lg:text-5xl">
            Have a workflow that needs a system?
            <br />
            <span className="font-extrabold">
              Let&apos;s build something practical.
            </span>
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
      </div>

      <SiteFooter className="mt-auto" />
    </section>
  );
}
