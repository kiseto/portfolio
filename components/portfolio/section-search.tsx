"use client";

import { FormEvent, useRef } from "react";
import { useLenis } from "lenis/react";
import { Search } from "lucide-react";

import { scrollOffset } from "@/components/portfolio/smooth-scroll";

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

export function SectionSearch() {
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
      searchRef.current?.blur();
      return;
    }

    document.getElementById(match.id)?.scrollIntoView({ block: "start" });
    searchRef.current?.blur();
  }

  return (
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
  );
}
