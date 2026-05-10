"use client";

import { ExternalLink } from "lucide-react";
import { siGithub } from "simple-icons";

import { SectionSearch } from "@/components/portfolio/section-search";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#home", label: "home" },
  { href: "#about", label: "about" },
  { href: "#tech-stack", label: "tech stack" },
  { href: "#projects", label: "projects" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="border-b border-border">
        <div className="mx-auto flex h-14 w-full max-w-[1000px] items-center justify-between gap-4 px-5 sm:px-6">
          <a
            href="#home"
            className="shrink-0 text-2xl font-extrabold leading-none tracking-normal text-foreground sm:text-3xl"
          >
            drkskt.github.io
          </a>

          <div className="flex items-center gap-2">
            <SectionSearch />

            <ThemeToggle />

            <Button asChild variant="ghost" size="icon-sm">
              <a
                href="https://www.linkedin.com/in/drake-sekito-804837408/"
                target="_blank"
                rel="noreferrer"
                aria-label="Open LinkedIn profile"
              >
                <ExternalLink aria-hidden="true" className="size-5" />
              </a>
            </Button>

            <Button asChild variant="ghost" size="icon-sm">
              <a
                href="https://github.com/kiseto"
                target="_blank"
                rel="noreferrer"
                aria-label="Open GitHub profile"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
                  <path fill="currentColor" d={siGithub.path} />
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="mx-auto flex h-8 w-full max-w-[1000px] items-center overflow-x-auto border-x border-b border-border px-5 sm:px-6"
      >
        <ol className="flex items-center gap-1 text-sm leading-none">
          {navItems.map((item) => (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                className="block rounded-md px-2.5 py-1.5 tracking-normal text-muted-foreground transition-colors hover:text-foreground focus-visible:bg-muted/40 focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}
