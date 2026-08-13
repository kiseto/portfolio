const basePath = process.env.GITHUB_ACTIONS === "true" ? "/portfolio" : "";

export function assetPath(path: string) {
  return `${basePath}${path}`;
}
