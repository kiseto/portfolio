import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CodeTerminalProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function CodeTerminal({ title, children, className }: CodeTerminalProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-border bg-background",
        className
      )}
    >
      <div className="flex h-9 items-center justify-between border-b border-border px-3">
        <div aria-hidden="true" className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="size-2 rounded-full bg-muted-foreground/30" />
          <span className="size-2 rounded-full bg-muted-foreground/20" />
        </div>
        <span className="font-mono text-xs leading-none text-muted-foreground">
          {title}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-7 text-muted-foreground sm:p-5">
        <code>{children}</code>
      </pre>
    </div>
  );
}
