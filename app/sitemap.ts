import type { MetadataRoute } from "next";

import { projectData } from "@/lib/projects";

const siteUrl = "https://kiseto.github.io/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectData.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
