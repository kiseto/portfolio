"use client";

import {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLenis } from "lenis/react";
import { Search, X } from "lucide-react";

import { scrollOffset } from "@/components/portfolio/smooth-scroll";

const searchableSections = [
  { id: "home", label: "Home", terms: ["home", "hero", "header", "intro"] },
  { id: "about", label: "About", terms: ["about", "profile", "bio"] },
  {
    id: "tech-stack",
    label: "Tech Stack",
    terms: ["tech", "tech stack", "stack", "skills"],
  },
  {
    id: "projects",
    label: "Projects",
    terms: ["projects", "project", "work", "portfolio"],
  },
  {
    id: "education",
    label: "Education",
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
    label: "Contact",
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

type SearchableSection = (typeof searchableSections)[number];

function sectionMatches(section: SearchableSection, query: string) {
  return [section.label.toLowerCase(), ...section.terms].some(
    (term) => term.includes(query) || query.includes(term)
  );
}

function getMatchingSections(query: string) {
  return query
    ? searchableSections.filter((section) => sectionMatches(section, query))
    : [];
}

function getShortcutLabel() {
  const platform = window.navigator.platform.toLowerCase();
  const userAgent = window.navigator.userAgent.toLowerCase();

  return platform.includes("mac") || /iphone|ipad|ipod/.test(userAgent)
    ? "⌘K"
    : "Ctrl+K";
}

export function SectionSearch() {
  const lenis = useLenis();
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [shortcutLabel, setShortcutLabel] = useState("Ctrl+K");

  const normalizedQuery = query.trim().toLowerCase();
  const suggestions = getMatchingSections(normalizedQuery);
  const showSuggestions = isSuggestionsOpen && suggestions.length > 0;
  const activeSuggestion =
    showSuggestions && activeSuggestionIndex >= 0
      ? suggestions[activeSuggestionIndex]
      : undefined;

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setShortcutLabel(getShortcutLabel());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    function handleGlobalShortcut(event: globalThis.KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.shiftKey ||
        event.key.toLowerCase() !== "k" ||
        (!event.ctrlKey && !event.metaKey)
      ) {
        return;
      }

      event.preventDefault();

      const currentQuery = searchRef.current?.value.trim().toLowerCase() ?? "";
      const currentSuggestions = getMatchingSections(currentQuery);

      searchRef.current?.focus();
      searchRef.current?.select();
      setIsSuggestionsOpen(currentSuggestions.length > 0);
      setActiveSuggestionIndex(currentSuggestions.length > 0 ? 0 : -1);
    }

    window.addEventListener("keydown", handleGlobalShortcut);

    return () => {
      window.removeEventListener("keydown", handleGlobalShortcut);
    };
  }, []);

  function navigateToSection(section: SearchableSection) {
    const target = `#${section.id}`;

    setIsSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);

    if (lenis) {
      lenis.scrollTo(target, { offset: scrollOffset });
      searchRef.current?.blur();
      return;
    }

    document.getElementById(section.id)?.scrollIntoView({ block: "start" });
    searchRef.current?.blur();
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!normalizedQuery) {
      setIsSuggestionsOpen(false);
      return;
    }

    const match =
      activeSuggestion ??
      searchableSections.find((section) =>
        sectionMatches(section, normalizedQuery)
      );

    if (!match) {
      searchRef.current?.select();
      setIsSuggestionsOpen(false);
      setActiveSuggestionIndex(-1);
      return;
    }

    navigateToSection(match);
  }

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.currentTarget.value;
    const nextSuggestions = getMatchingSections(nextQuery.trim().toLowerCase());

    setQuery(nextQuery);
    setIsSuggestionsOpen(nextSuggestions.length > 0);
    setActiveSuggestionIndex(nextSuggestions.length > 0 ? 0 : -1);
  }

  function handleClear() {
    searchRef.current?.focus();
    setQuery("");
    setIsSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
  }

  function handleFocus() {
    setIsSuggestionsOpen(suggestions.length > 0);
    setActiveSuggestionIndex(suggestions.length > 0 ? 0 : -1);
  }

  function handleBlur() {
    setIsSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (suggestions.length === 0) {
        return;
      }

      event.preventDefault();
      setIsSuggestionsOpen(true);

      const isMovingDown = event.key === "ArrowDown";

      setActiveSuggestionIndex((currentIndex) => {
        if (!showSuggestions || currentIndex < 0) {
          return isMovingDown ? 0 : suggestions.length - 1;
        }

        return isMovingDown
          ? (currentIndex + 1) % suggestions.length
          : (currentIndex - 1 + suggestions.length) % suggestions.length;
      });

      return;
    }

    if (event.key === "Enter" && activeSuggestion) {
      event.preventDefault();
      navigateToSection(activeSuggestion);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsSuggestionsOpen(false);
      setActiveSuggestionIndex(-1);
      searchRef.current?.blur();
    }
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
        autoComplete="off"
        placeholder="Search sections..."
        value={query}
        onChange={handleQueryChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleInputKeyDown}
        className={`h-9 w-full rounded-md border border-border bg-background py-2 pl-10 text-sm leading-none text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-search-cancel-button]:appearance-none ${
          query ? "pr-10" : "pr-20"
        }`}
      />
      {query ? (
        <button
          type="button"
          aria-label="Clear section search"
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleClear}
          className="absolute right-1.5 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <X aria-hidden="true" className="size-4" strokeWidth={2.4} />
        </button>
      ) : (
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium leading-none text-muted-foreground">
          {shortcutLabel}
        </kbd>
      )}
      {showSuggestions ? (
        <ul
          id="section-search-suggestions"
          className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-md border border-border bg-background py-1 shadow-lg"
        >
          {suggestions.map((section, index) => {
            const isActive = index === activeSuggestionIndex;

            return (
              <li key={section.id}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveSuggestionIndex(index)}
                  onClick={() => navigateToSection(section)}
                  className={`block w-full px-3 py-2 text-left text-sm leading-none text-foreground transition-colors focus-visible:bg-muted focus-visible:outline-none ${
                    isActive ? "bg-muted" : "hover:bg-muted"
                  }`}
                >
                  {section.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
