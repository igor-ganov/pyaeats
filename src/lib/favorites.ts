/** Glass-concept favorites: an observable set of store ids persisted to localStorage. */

type Listener = (ids: ReadonlySet<string>) => void;

const KEY = 'pya.glass.favorites';
const listeners = new Set<Listener>();

const read = (): Set<string> => {
  try {
    const raw = globalThis.localStorage?.getItem(KEY);
    if (raw === null || raw === undefined) return new Set();
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? new Set(parsed.filter((v): v is string => typeof v === 'string'))
      : new Set();
  } catch {
    return new Set();
  }
};

const write = (ids: ReadonlySet<string>): void => {
  globalThis.localStorage?.setItem(KEY, JSON.stringify([...ids]));
  listeners.forEach((l) => l(ids));
};

export const favorites = {
  read: (): ReadonlySet<string> => read(),
  has: (id: string): boolean => read().has(id),
  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  toggle: (id: string): boolean => {
    const ids = read();
    const willAdd = !ids.has(id);
    if (willAdd) ids.add(id);
    else ids.delete(id);
    write(ids);
    return willAdd;
  },
};
