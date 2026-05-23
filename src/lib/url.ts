/**
 * Prepend Astro's `BASE_URL` to an absolute path so all internal links keep
 * working under `https://<host>/<base>/…` (e.g. GitHub Pages project sites).
 *
 * Defensive: `BASE_URL` may or may not include a trailing slash depending on
 * how `base` and `trailingSlash` are configured — normalise both sides so we
 * always emit exactly one slash between them.
 */
export const u = (path: string): string => {
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');
  const tail = path.startsWith('/') ? path : `/${path}`;
  return `${base}${tail}`;
};
