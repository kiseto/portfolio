import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle: string;
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <h2 className="text-4xl font-extrabold leading-none tracking-normal text-foreground sm:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-6 text-muted-foreground sm:text-lg">
        {subtitle}
      </p>
    </div>
  );
}
