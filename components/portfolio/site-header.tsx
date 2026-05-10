"use client";

import { FormEvent, useRef } from "react";
import { useLenis } from "lenis/react";
import { Search, Sun } from "lucide-react";
import { siGithub } from "simple-icons";

import { scrollOffset } from "@/components/portfolio/smooth-scroll";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#home", label: "home" },
  { href: "#about", label: "about" },
  { href: "#tech-stack", label: "tech stack" },
  { href: "#projects", label: "projects" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

const searchableSections = [
  { id: "home", terms: ["home", "hero", "header", "intro"] },
  { id: "about", terms: ["about", "profile", "bio"] },
  { id: "tech-stack", terms: ["tech", "tech stack", "stack", "skills"] },
  { id: "projects", terms: ["projects", "project", "work", "portfolio"] },
  {
    id: "education",
    terms: [
      "education",
      "school",
      "college",
      "ncst",
      "pup",
      "information technology",
      "senior high school",
      "ict",
      "web systems",
      "database",
      "capstone",
    ],
  },
  {
    id: "contact",
    terms: [
      "contact",
      "email",
      "mail",
      "github",
      "linkedin",
      "location",
      "timezone",
      "philippines",
      "freelance",
      "opportunities",
    ],
  },
];

export function SiteHeader() {
  const lenis = useLenis();
  const searchRef = useRef<HTMLInputElement>(null);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchRef.current?.value.trim().toLowerCase();

    if (!query) {
      return;
    }

    const match = searchableSections.find(({ terms }) =>
      terms.some((term) => term.includes(query) || query.includes(term))
    );

    if (!match) {
      searchRef.current?.select();
      return;
    }

    const target = `#${match.id}`;

    if (lenis) {
      lenis.scrollTo(target, { offset: scrollOffset });
      return;
    }

    document.getElementById(match.id)?.scrollIntoView({ block: "start" });
  }

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
            <form
              onSubmit={handleSearch}
              className="relative hidden w-64 items-center sm:flex lg:w-72"
            >
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 size-5 text-foreground"
                strokeWidth={2.4}
              />
              <input
                ref={searchRef}
                type="search"
                aria-label="Search sections"
                placeholder="Search sections..."
                className="h-9 w-full rounded-full border border-foreground bg-background py-2 pl-10 pr-4 text-sm leading-none text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </form>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Dark interface"
            >
              <Sun className="size-5" strokeWidth={2.3} />
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
        <ol className="flex items-center gap-4 text-sm leading-none sm:text-base">
          {navItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-4">
              <a
                href={item.href}
                className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
              >
                {item.label}
              </a>
              {index < navItems.length - 1 ? (
                <span aria-hidden="true" className="text-muted-foreground">
                  /
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}
