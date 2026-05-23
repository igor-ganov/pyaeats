/**
 * Prepend Astro's `BASE_URL` to an absolute path so all internal links keep
 * working under `https://<host>/<base>/…` (e.g. GitHub Pages project sites).
 * `import.meta.env.BASE_URL` is replaced at build time and always ends with `/`.
 */
export const u = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, '')}`;
};
