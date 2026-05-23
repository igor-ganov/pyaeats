import { LightWebComponent, defineComponent } from '../define.ts';
import { STORES, CATEGORIES, formatGs, priceLabel } from '~/data/stores.ts';
import type { Store, Cuisine, PriceTier } from '~/data/stores.ts';
import { favorites } from '~/lib/favorites.ts';
import { u } from '~/lib/url.ts';

type Tab = 'cerca' | 'top' | 'promos' | 'nuevos';

const TABS: readonly { readonly id: Tab; readonly label: string }[] = [
  { id: 'cerca', label: 'Cerca' },
  { id: 'top', label: 'Top' },
  { id: 'promos', label: 'Promos' },
  { id: 'nuevos', label: 'Nuevos' },
];

interface State {
  q: string;
  cuisine: Cuisine | '';
  tab: Tab;
  prices: Set<PriceTier>;
  free: boolean;
  express: boolean;
  openNow: boolean;
}

const isPriceTier = (n: number): n is PriceTier => n === 1 || n === 2 || n === 3;
const CUISINES: ReadonlySet<string> = new Set(CATEGORIES.map((c) => c.cuisine));
const isCuisine = (value: string | undefined): value is Cuisine => value !== undefined && CUISINES.has(value);
const norm = (s: string): string => s.toLowerCase().trim();

const cardHtml = (s: Store): string => {
  const fav = favorites.has(s.id);
  const tags = [
    s.express ? '⚡ Express' : '',
    s.freeShipping ? '🛵 Gratis' : `🛵 ${formatGs(s.feeGs)}`,
    priceLabel(s.price),
    `${s.distanceKm} km`,
  ].filter((t) => t !== '');
  return `
    <a class="gl__card${s.isOpen ? '' : ' is-closed'}" href="${u(`/c/glass/tienda/${s.id}`)}">
      <div class="gl__photo thumb--${s.thumb}">${s.emoji}
        ${s.promo === undefined ? '' : `<span class="gl__tag">${s.promo}</span>`}
        ${s.isOpen ? '' : '<span class="gl__closed-flag">Cerrado</span>'}
        <button class="gl__fav" type="button" data-fav="${s.id}" aria-pressed="${fav}" aria-label="Favorito">${fav ? '❤️' : '🤍'}</button>
      </div>
      <div class="gl__card-body">
        <div class="gl__card-row"><h3 class="gl__card-name">${s.name}</h3><span class="gl__rating">★ ${s.rating}</span></div>
        <p class="gl__card-meta">${s.cuisineLabel} · ${s.etaMin}–${s.etaMax} min</p>
        <div class="gl__tags">${tags.map((t) => `<span class="gl__minitag">${t}</span>`).join('')}</div>
      </div>
    </a>`;
};

class GlassStoreExplorer extends LightWebComponent {
  private readonly state: State = {
    q: '', cuisine: '', tab: 'cerca', prices: new Set(), free: false, express: false, openNow: false,
  };

  protected render(): void {
    this.innerHTML = `
      <label class="gl__search">🔎
        <input type="search" data-search placeholder="Buscar comida, tiendas…" />
        <button class="gl__search-clear" type="button" data-clear hidden aria-label="Limpiar">×</button>
      </label>

      <div class="gl__cats">
        ${CATEGORIES.map((c) => `
          <button class="gl__cat" type="button" data-cuisine="${c.cuisine}">
            <span class="gl__cat-ic">${c.icon}</span><span>${c.label}</span>
          </button>`).join('')}
      </div>

      <div class="gl__seghead">
        <h2 class="gl__h2">Tiendas para ti</h2>
        <div class="gl__seg">
          ${TABS.map((t) => `<button class="gl__seg-btn" type="button" data-tab="${t.id}">${t.label}</button>`).join('')}
        </div>
      </div>

      <div class="gl__filters">
        <button class="gl__fchip" type="button" data-filter="free">🛵 Envío gratis</button>
        <button class="gl__fchip" type="button" data-filter="express">⚡ Express</button>
        <button class="gl__fchip" type="button" data-filter="open">🟢 Abierto ahora</button>
        <button class="gl__fchip" type="button" data-price="1">$</button>
        <button class="gl__fchip" type="button" data-price="2">$$</button>
        <button class="gl__fchip" type="button" data-price="3">$$$</button>
      </div>

      <p class="gl__count" data-count></p>
      <div class="gl__grid" data-grid></div>`;
  }

  protected override afterRender(): void {
    this.addEventListener('pointerdown', this.markMorphSource);
    this.addEventListener('click', this.onClick);
    this.addEventListener('input', this.onInput);
    this.update();
  }

  public disconnectedCallback(): void {
    this.removeEventListener('pointerdown', this.markMorphSource);
    this.removeEventListener('click', this.onClick);
    this.removeEventListener('input', this.onInput);
  }

  /**
   * Name the to-be-clicked card on `pointerdown` (fires before `click`), so by
   * the time Astro intercepts the click for View Transitions the card already
   * carries `view-transition-name=card-expand` and the browser can morph its
   * bounding box into `.gl__cover` on the detail page (container transform).
   * Only one element ever carries the name → zero idle perf cost.
   */
  private readonly markMorphSource = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-fav]') !== null) return; // favourite toggle: not a navigation
    const card = target.closest<HTMLElement>('.gl__card');
    if (card === null) return;
    // Clear any previously-marked card (cheap defensive cleanup before re-marking).
    this.querySelectorAll<HTMLElement>('.gl__card').forEach((el) => {
      if (el !== card) el.style.removeProperty('view-transition-name');
    });
    card.style.setProperty('view-transition-name', 'card-expand');
  };

  private readonly onInput = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.dataset['search'] === undefined) return;
    this.state.q = target.value;
    const clear = this.querySelector<HTMLElement>('[data-clear]');
    if (clear !== null) clear.hidden = target.value === '';
    this.update();
  };

  private readonly onClick = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const fav = target.closest<HTMLElement>('[data-fav]');
    if (fav !== null) {
      event.preventDefault();
      const id = fav.dataset['fav'];
      if (id !== undefined) { favorites.toggle(id); this.update(); }
      return;
    }

    const cat = target.closest<HTMLElement>('[data-cuisine]');
    if (cat !== null) {
      const value = cat.dataset['cuisine'];
      if (isCuisine(value)) this.state.cuisine = this.state.cuisine === value ? '' : value;
      this.update();
      return;
    }

    const tab = target.closest<HTMLElement>('[data-tab]');
    if (tab !== null) {
      const value = tab.dataset['tab'];
      if (value === 'cerca' || value === 'top' || value === 'promos' || value === 'nuevos') this.state.tab = value;
      this.update();
      return;
    }

    const filter = target.closest<HTMLElement>('[data-filter]');
    if (filter !== null) {
      const value = filter.dataset['filter'];
      if (value === 'free') this.state.free = !this.state.free;
      if (value === 'express') this.state.express = !this.state.express;
      if (value === 'open') this.state.openNow = !this.state.openNow;
      this.update();
      return;
    }

    const price = target.closest<HTMLElement>('[data-price]');
    if (price !== null) {
      const tier = Number(price.dataset['price']);
      if (isPriceTier(tier)) {
        if (this.state.prices.has(tier)) this.state.prices.delete(tier);
        else this.state.prices.add(tier);
      }
      this.update();
      return;
    }

    const clear = target.closest<HTMLElement>('[data-clear]');
    if (clear !== null) {
      this.state.q = '';
      const input = this.querySelector<HTMLInputElement>('[data-search]');
      if (input !== null) { input.value = ''; input.focus(); }
      clear.setAttribute('hidden', '');
      this.update();
    }
  };

  private filtered(): readonly Store[] {
    const { q, cuisine, tab, prices, free, express, openNow } = this.state;
    const query = norm(q);
    const list = STORES.filter((s) => {
      if (query !== '' && !(norm(s.name).includes(query) || norm(s.cuisineLabel).includes(query))) return false;
      if (cuisine !== '' && s.cuisine !== cuisine) return false;
      if (prices.size > 0 && !prices.has(s.price)) return false;
      if (free && !s.freeShipping) return false;
      if (express && !s.express) return false;
      if (openNow && !s.isOpen) return false;
      if (tab === 'promos' && s.promo === undefined) return false;
      if (tab === 'nuevos' && !s.isNew) return false;
      return true;
    });
    return [...list].sort((a, b) => (tab === 'cerca' ? a.distanceKm - b.distanceKm : b.rating - a.rating));
  }

  private update(): void {
    const list = this.filtered();
    const grid = this.querySelector<HTMLElement>('[data-grid]');
    const count = this.querySelector<HTMLElement>('[data-count]');

    if (count !== null) {
      count.textContent =
        list.length === 0
          ? 'Sin resultados con esos filtros'
          : `${list.length} ${list.length === 1 ? 'tienda' : 'tiendas'} · cerca de Villa Morra`;
    }

    if (grid !== null) {
      grid.innerHTML = list.length === 0
        ? `<div class="gl__empty"><div class="gl__empty-emoji">🔍🍽️</div><h3>Nada por aquí</h3><p>Probá quitar algún filtro o cambiar la búsqueda.</p></div>`
        : list.map(cardHtml).join('');
    }

    this.syncActive('[data-cuisine]', (el) => el.dataset['cuisine'] === this.state.cuisine, 'is-on');
    this.syncActive('[data-tab]', (el) => el.dataset['tab'] === this.state.tab, 'is-on');
    this.syncActive('[data-filter="free"]', () => this.state.free, 'is-on');
    this.syncActive('[data-filter="express"]', () => this.state.express, 'is-on');
    this.syncActive('[data-filter="open"]', () => this.state.openNow, 'is-on');
    this.syncActive('[data-price]', (el) => {
      const tier = Number(el.dataset['price']);
      return isPriceTier(tier) && this.state.prices.has(tier);
    }, 'is-on');
  }

  private syncActive(selector: string, isOn: (el: HTMLElement) => boolean, cls: string): void {
    this.querySelectorAll<HTMLElement>(selector).forEach((el) => el.classList.toggle(cls, isOn(el)));
  }
}

defineComponent('glass-store-explorer', GlassStoreExplorer);
