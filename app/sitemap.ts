import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  const staticRoutes = ["", "/services", "/pricing", "/portfolio", "/about", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })
  );
  const projectRoutes = projects.map((project) => ({
    url: `${site.url}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...projectRoutes];
}
