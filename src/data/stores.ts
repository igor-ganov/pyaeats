/**
 * Store dataset for the Glass concept — single source of truth shared by the
 * storefront explorer, the per-store detail pages and the cart.
 */

export type Cuisine =
  | 'burger' | 'pizza' | 'sushi' | 'chipa' | 'asado' | 'mexicana' | 'postres' | 'bebidas';

export type PriceTier = 1 | 2 | 3;

export interface Store {
  readonly id: string;
  readonly name: string;
  readonly cuisine: Cuisine;
  readonly cuisineLabel: string;
  readonly emoji: string;
  /** Gradient key reused from the global `thumb--*` classes. */
  readonly thumb: string;
  readonly rating: number;
  readonly reviews: number;
  readonly etaMin: number;
  readonly etaMax: number;
  readonly price: PriceTier;
  readonly distanceKm: number;
  readonly feeGs: number;
  readonly freeShipping: boolean;
  readonly express: boolean;
  readonly isOpen: boolean;
  readonly isNew: boolean;
  readonly promo?: string;
}

export interface Category {
  readonly cuisine: Cuisine;
  readonly label: string;
  readonly icon: string;
}

export interface MenuItem {
  readonly id: string;
  readonly name: string;
  readonly desc: string;
  readonly priceGs: number;
  readonly emoji: string;
  readonly thumb: string;
}

export interface Review {
  readonly initials: string;
  readonly avatar: 'a1' | 'a2' | 'a3' | 'a4';
  readonly name: string;
  readonly when: string;
  readonly stars: number;
  readonly text: string;
  readonly photos: readonly { readonly thumb: string; readonly emoji: string }[];
}

export const CATEGORIES: readonly Category[] = [
  { cuisine: 'burger', label: 'Burgers', icon: '🍔' },
  { cuisine: 'pizza', label: 'Pizza', icon: '🍕' },
  { cuisine: 'sushi', label: 'Sushi', icon: '🍣' },
  { cuisine: 'chipa', label: 'Chipa', icon: '🧀' },
  { cuisine: 'asado', label: 'Asado', icon: '🥩' },
  { cuisine: 'mexicana', label: 'Mexicana', icon: '🌮' },
  { cuisine: 'postres', label: 'Dulce', icon: '🍰' },
  { cuisine: 'bebidas', label: 'Bebidas', icon: '🥤' },
];

export const STORES: readonly Store[] = [
  { id: 'burger-house', name: 'Burger House', cuisine: 'burger', cuisineLabel: 'Hamburguesas', emoji: '🍔', thumb: 'burger', rating: 4.8, reviews: 1240, etaMin: 25, etaMax: 35, price: 2, distanceKm: 2.1, feeGs: 8000, freeShipping: false, express: false, isOpen: true, isNew: false, promo: '-30%' },
  { id: 'patio-burger', name: 'Patio Burger', cuisine: 'burger', cuisineLabel: 'Hamburguesas · Lomitos', emoji: '🍔', thumb: 'burger', rating: 4.7, reviews: 860, etaMin: 20, etaMax: 30, price: 1, distanceKm: 1.3, feeGs: 0, freeShipping: true, express: true, isOpen: true, isNew: true },
  { id: 'smash-co', name: 'Smash Co.', cuisine: 'burger', cuisineLabel: 'Smash burgers', emoji: '🍔', thumb: 'burger', rating: 4.9, reviews: 540, etaMin: 30, etaMax: 40, price: 3, distanceKm: 3.0, feeGs: 12000, freeShipping: false, express: false, isOpen: true, isNew: false },
  { id: 'la-pizzeria', name: 'La Pizzería', cuisine: 'pizza', cuisineLabel: 'Pizza · Italiana', emoji: '🍕', thumb: 'pizza', rating: 4.6, reviews: 980, etaMin: 30, etaMax: 40, price: 2, distanceKm: 3.4, feeGs: 9000, freeShipping: false, express: false, isOpen: true, isNew: false, promo: '2x1' },
  { id: 'forno-nero', name: 'Forno Nero', cuisine: 'pizza', cuisineLabel: 'Napolitana a la leña', emoji: '🍕', thumb: 'pizza', rating: 4.8, reviews: 410, etaMin: 35, etaMax: 45, price: 3, distanceKm: 4.6, feeGs: 12000, freeShipping: false, express: false, isOpen: false, isNew: true, promo: '-15%' },
  { id: 'sakura-sushi', name: 'Sakura Sushi', cuisine: 'sushi', cuisineLabel: 'Japonesa', emoji: '🍣', thumb: 'sushi', rating: 4.9, reviews: 1320, etaMin: 35, etaMax: 45, price: 3, distanceKm: 4.0, feeGs: 12000, freeShipping: false, express: false, isOpen: true, isNew: false, promo: '-20%' },
  { id: 'tokio-rolls', name: 'Tokio Rolls', cuisine: 'sushi', cuisineLabel: 'Sushi & ramen', emoji: '🍣', thumb: 'sushi', rating: 4.5, reviews: 300, etaMin: 40, etaMax: 55, price: 2, distanceKm: 5.1, feeGs: 10000, freeShipping: false, express: false, isOpen: true, isNew: true },
  { id: 'chipa-barrero', name: 'Chipa Barrero', cuisine: 'chipa', cuisineLabel: 'Paraguaya', emoji: '🧀', thumb: 'chipa', rating: 4.7, reviews: 2100, etaMin: 15, etaMax: 25, price: 1, distanceKm: 0.8, feeGs: 0, freeShipping: true, express: true, isOpen: true, isNew: false },
  { id: 'chiperia-na-blanca', name: 'Chipería Ña Blanca', cuisine: 'chipa', cuisineLabel: 'Comida típica', emoji: '🧀', thumb: 'chipa', rating: 4.6, reviews: 760, etaMin: 15, etaMax: 25, price: 1, distanceKm: 1.1, feeGs: 5000, freeShipping: false, express: true, isOpen: true, isNew: false },
  { id: 'don-asador', name: 'Don Asador', cuisine: 'asado', cuisineLabel: 'Parrilla · Asado', emoji: '🥩', thumb: 'asado', rating: 4.5, reviews: 640, etaMin: 40, etaMax: 55, price: 3, distanceKm: 5.2, feeGs: 12000, freeShipping: false, express: false, isOpen: true, isNew: false, promo: '-25%' },
  { id: 'fuego-parrilla', name: 'Fuego Parrilla', cuisine: 'asado', cuisineLabel: 'Parrilla premium', emoji: '🥩', thumb: 'asado', rating: 4.7, reviews: 520, etaMin: 45, etaMax: 60, price: 3, distanceKm: 6.0, feeGs: 15000, freeShipping: false, express: false, isOpen: false, isNew: true },
  { id: 'el-mexicano', name: 'El Mexicano', cuisine: 'mexicana', cuisineLabel: 'Mexicana', emoji: '🌮', thumb: 'taco', rating: 4.4, reviews: 430, etaMin: 25, etaMax: 35, price: 2, distanceKm: 2.9, feeGs: 9000, freeShipping: false, express: false, isOpen: true, isNew: true },
  { id: 'taco-loco', name: 'Taco Loco', cuisine: 'mexicana', cuisineLabel: 'Tacos & burritos', emoji: '🌮', thumb: 'taco', rating: 4.6, reviews: 290, etaMin: 20, etaMax: 30, price: 1, distanceKm: 1.9, feeGs: 7000, freeShipping: true, express: true, isOpen: true, isNew: true },
  { id: 'dulce-tentacion', name: 'Dulce Tentación', cuisine: 'postres', cuisineLabel: 'Postres & tortas', emoji: '🍰', thumb: 'dessert', rating: 4.8, reviews: 710, etaMin: 25, etaMax: 35, price: 2, distanceKm: 3.2, feeGs: 8000, freeShipping: false, express: false, isOpen: true, isNew: false, promo: '2x1' },
  { id: 'jugos-pyahu', name: 'Jugos Pyahu', cuisine: 'bebidas', cuisineLabel: 'Jugos & smoothies', emoji: '🥤', thumb: 'drink', rating: 4.5, reviews: 180, etaMin: 15, etaMax: 25, price: 1, distanceKm: 1.0, feeGs: 4000, freeShipping: true, express: true, isOpen: true, isNew: true },
];

export const findStore = (id: string): Store | undefined => STORES.find((s) => s.id === id);

export const formatGs = (n: number): string =>
  n === 0 ? 'Gratis' : `Gs. ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

export const priceLabel = (tier: PriceTier): string => '$'.repeat(tier);

const MENUS: Readonly<Record<Cuisine, readonly Omit<MenuItem, 'id'>[]>> = {
  burger: [
    { name: 'Doble Cheddar', desc: 'Doble carne, cheddar, bacon', priceGs: 38000, emoji: '🍔', thumb: 'burger' },
    { name: 'Clásica BBQ', desc: 'Carne, cebolla crispy, salsa BBQ', priceGs: 32000, emoji: '🍔', thumb: 'burger' },
    { name: 'Papas con cheddar', desc: 'Porción grande para compartir', priceGs: 18000, emoji: '🍟', thumb: 'taco' },
    { name: 'Bebida 500 ml', desc: 'Línea Coca-Cola', priceGs: 9000, emoji: '🥤', thumb: 'drink' },
  ],
  pizza: [
    { name: 'Margherita', desc: 'Mozzarella, tomate, albahaca', priceGs: 42000, emoji: '🍕', thumb: 'pizza' },
    { name: 'Pepperoni', desc: 'Doble pepperoni y queso', priceGs: 48000, emoji: '🍕', thumb: 'pizza' },
    { name: 'Pan de ajo', desc: 'Con muzzarella gratinada', priceGs: 16000, emoji: '🥖', thumb: 'chipa' },
    { name: 'Gaseosa 1.5 L', desc: 'Para compartir', priceGs: 12000, emoji: '🥤', thumb: 'drink' },
  ],
  sushi: [
    { name: 'Combo 30 piezas', desc: 'Variado del chef', priceGs: 95000, emoji: '🍣', thumb: 'sushi' },
    { name: 'Roll California', desc: 'Kani, palta, pepino', priceGs: 38000, emoji: '🍣', thumb: 'sushi' },
    { name: 'Gyozas (6u)', desc: 'Rellenas de cerdo', priceGs: 24000, emoji: '🥟', thumb: 'chipa' },
    { name: 'Té verde frío', desc: 'Botella 500 ml', priceGs: 10000, emoji: '🍵', thumb: 'drink' },
  ],
  chipa: [
    { name: 'Docena de chipa', desc: 'Recién horneada', priceGs: 20000, emoji: '🧀', thumb: 'chipa' },
    { name: 'Chipa guazú', desc: 'Porción individual', priceGs: 14000, emoji: '🧀', thumb: 'chipa' },
    { name: 'Cocido con leche', desc: 'Vaso grande', priceGs: 8000, emoji: '☕', thumb: 'drink' },
    { name: 'Sopa paraguaya', desc: 'Porción', priceGs: 16000, emoji: '🟨', thumb: 'taco' },
  ],
  asado: [
    { name: 'Parrillada para 2', desc: 'Surtido de cortes', priceGs: 120000, emoji: '🥩', thumb: 'asado' },
    { name: 'Costillar', desc: 'A la estaca', priceGs: 78000, emoji: '🥩', thumb: 'asado' },
    { name: 'Mandioca', desc: 'Porción', priceGs: 12000, emoji: '🥔', thumb: 'chipa' },
    { name: 'Vino de la casa', desc: 'Copa', priceGs: 18000, emoji: '🍷', thumb: 'drink' },
  ],
  mexicana: [
    { name: 'Tacos al pastor (3u)', desc: 'Con piña y cilantro', priceGs: 34000, emoji: '🌮', thumb: 'taco' },
    { name: 'Burrito grande', desc: 'Carne, frijoles, guaca', priceGs: 38000, emoji: '🌯', thumb: 'taco' },
    { name: 'Nachos con queso', desc: 'Para compartir', priceGs: 22000, emoji: '🧀', thumb: 'taco' },
    { name: 'Agua de horchata', desc: 'Vaso', priceGs: 10000, emoji: '🥤', thumb: 'drink' },
  ],
  postres: [
    { name: 'Torta selva negra', desc: 'Porción', priceGs: 24000, emoji: '🍰', thumb: 'dessert' },
    { name: 'Cheesecake', desc: 'Frutos rojos', priceGs: 26000, emoji: '🍰', thumb: 'dessert' },
    { name: 'Brownie con helado', desc: 'Caliente', priceGs: 22000, emoji: '🍫', thumb: 'dessert' },
    { name: 'Café latte', desc: 'Vaso 350 ml', priceGs: 12000, emoji: '☕', thumb: 'drink' },
  ],
  bebidas: [
    { name: 'Smoothie tropical', desc: 'Mango y maracuyá', priceGs: 16000, emoji: '🥤', thumb: 'drink' },
    { name: 'Jugo de naranja', desc: 'Exprimido 500 ml', priceGs: 12000, emoji: '🍊', thumb: 'drink' },
    { name: 'Limonada de menta', desc: 'Jarra', priceGs: 14000, emoji: '🍋', thumb: 'drink' },
    { name: 'Agua mineral', desc: 'Botella 600 ml', priceGs: 6000, emoji: '💧', thumb: 'drink' },
  ],
};

export const menuFor = (store: Store): readonly MenuItem[] =>
  (MENUS[store.cuisine] ?? []).map((item, i) => ({ ...item, id: `${store.id}-${i}` }));

const REVIEW_POOL: readonly Review[] = [
  { initials: 'MG', avatar: 'a1', name: 'María González', when: 'hace 2 días', stars: 5, text: 'Llegó caliente y antes de tiempo. El repartidor súper amable. ¡Pido de nuevo seguro!', photos: [{ thumb: 'burger', emoji: '🍔' }, { thumb: 'drink', emoji: '🥤' }] },
  { initials: 'JR', avatar: 'a2', name: 'Jorge Ramírez', when: 'hace 5 días', stars: 4, text: 'Muy rica la comida y buena porción. Tardó un poco más de lo estimado, pero valió la pena.', photos: [] },
  { initials: 'CB', avatar: 'a3', name: 'Carla Benítez', when: 'hace 1 semana', stars: 5, text: 'Mi lugar favorito de Asunción para pedir un viernes. Empaque impecable. 👌', photos: [{ thumb: 'dessert', emoji: '🍰' }] },
  { initials: 'DP', avatar: 'a4', name: 'Diego Paredes', when: 'hace 2 semanas', stars: 4, text: 'Buen precio con la promo. La atención al cliente respondió rápido cuando consulté.', photos: [] },
  { initials: 'LA', avatar: 'a2', name: 'Lucía Acosta', when: 'hace 3 semanas', stars: 5, text: 'Sabor casero de verdad. Se nota la calidad de los ingredientes.', photos: [{ thumb: 'sushi', emoji: '🍣' }] },
  { initials: 'FV', avatar: 'a1', name: 'Federico Vera', when: 'hace 1 mes', stars: 3, text: 'Rico pero esta vez vino frío. Espero que mejoren el packaging para el invierno.', photos: [] },
];

export const reviewsFor = (store: Store): readonly Review[] => {
  const offset = store.id.charCodeAt(0) % REVIEW_POOL.length;
  return Array.from({ length: 4 }, (_, i) => REVIEW_POOL[(offset + i) % REVIEW_POOL.length]).filter(
    (r): r is Review => r !== undefined,
  );
};

export interface RatingBar { readonly star: number; readonly pct: number }

export const ratingBreakdown = (rating: number): readonly RatingBar[] => {
  const gap = 5 - rating;
  const weights = [
    Math.pow(Math.max(rating - 2, 0), 2),
    gap * 2.2 + 0.6,
    gap * 1.0 + 0.3,
    gap * 0.5 + 0.15,
    gap * 0.4 + 0.1,
  ];
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  return weights.map((w, i) => ({ star: 5 - i, pct: Math.round((w / total) * 100) }));
};
