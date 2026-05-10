import { PhilippinesTime } from "@/components/portfolio/philippines-time";
import { cn } from "@/lib/utils";

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

type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer className={cn("border-t border-border pt-5", className)}>
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
    </footer>
  );
}
