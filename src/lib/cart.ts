/** Glass-concept cart: a tiny observable store persisted to localStorage. */

export interface CartLine {
  readonly id: string;
  readonly name: string;
  readonly priceGs: number;
  readonly emoji: string;
  readonly qty: number;
}

type Listener = (lines: readonly CartLine[]) => void;

const KEY = 'pya.glass.cart';
const listeners = new Set<Listener>();

const isLine = (value: unknown): value is CartLine => {
  if (typeof value !== 'object' || value === null) return false;
  const v: Partial<Record<keyof CartLine, unknown>> = value;
  return (
    typeof v.id === 'string' &&
    typeof v.name === 'string' &&
    typeof v.priceGs === 'number' &&
    typeof v.emoji === 'string' &&
    typeof v.qty === 'number'
  );
};

const read = (): readonly CartLine[] => {
  try {
    const raw = globalThis.localStorage?.getItem(KEY);
    if (raw === null || raw === undefined) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isLine) : [];
  } catch {
    return [];
  }
};

const write = (lines: readonly CartLine[]): void => {
  globalThis.localStorage?.setItem(KEY, JSON.stringify(lines));
  listeners.forEach((l) => l(lines));
};

export const cart = {
  read,
  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  add: (item: Omit<CartLine, 'qty'>, qty = 1): void => {
    const lines = read();
    const existing = lines.find((l) => l.id === item.id);
    const next = existing
      ? lines.map((l) => (l.id === item.id ? { ...l, qty: l.qty + qty } : l))
      : [...lines, { ...item, qty }];
    write(next);
  },
  setQty: (id: string, qty: number): void => {
    const next = read()
      .map((l) => (l.id === id ? { ...l, qty } : l))
      .filter((l) => l.qty > 0);
    write(next);
  },
  remove: (id: string): void => write(read().filter((l) => l.id !== id)),
  clear: (): void => write([]),
  count: (): number => read().reduce((sum, l) => sum + l.qty, 0),
  subtotal: (): number => read().reduce((sum, l) => sum + l.priceGs * l.qty, 0),
};
