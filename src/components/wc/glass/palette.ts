import { LightWebComponent, defineComponent } from '../define.ts';

/** Floating palette switcher for the Glass concept. Writes <html data-glass> + persists. */

const KEY = 'pya.glass';

interface Palette {
  readonly id: string;
  readonly label: string;
  /** Three representative stops used to preview the palette in a swatch. */
  readonly stops: readonly [string, string, string];
}

const PALETTES: readonly Palette[] = [
  { id: 'mango', label: 'Mango', stops: ['#ffd166', '#ff7a3d', '#ff3b1f'] },
  { id: 'tomate', label: 'Tomate', stops: ['#ff9b7a', '#e23b3b', '#f3722c'] },
  { id: 'lima', label: 'Lima', stops: ['#dcf7a0', '#34c97b', '#84cc16'] },
  { id: 'miel', label: 'Miel', stops: ['#ffd49a', '#ff6b6b', '#ff924c'] },
  { id: 'caramelo', label: 'Caramelo', stops: ['#f3d6a8', '#c8814a', '#9a3412'] },
];

const DEFAULT = 'mango';
const current = (): string => document.documentElement.dataset['glass'] ?? DEFAULT;

class GlassPalette extends LightWebComponent {
  private isOpen = false;

  protected render(): void {
    const active = current();
    this.innerHTML = `
      <button class="gl-pal__fab" type="button" data-action="toggle" aria-expanded="${this.isOpen}" aria-label="Cambiar paleta">🎨</button>
      <div class="gl-pal__pop" data-open="${this.isOpen}" role="dialog" aria-label="Paletas">
        <p class="gl-pal__title">Paleta apetitosa</p>
        <div class="gl-pal__grid" role="radiogroup">
          ${PALETTES.map((p) => `
            <button class="gl-pal__swatch" type="button" role="radio" data-action="pick" data-id="${p.id}"
                    aria-checked="${active === p.id}" title="${p.label}"
                    style="background: linear-gradient(135deg, ${p.stops[0]}, ${p.stops[1]} 55%, ${p.stops[2]});">
              <span>${p.label}</span>
            </button>`).join('')}
        </div>
      </div>`;
  }

  protected override afterRender(): void {
    this.addEventListener('click', this.onClick);
    document.addEventListener('click', this.onOutside);
  }

  public disconnectedCallback(): void {
    this.removeEventListener('click', this.onClick);
    document.removeEventListener('click', this.onOutside);
  }

  private readonly onOutside = (event: Event): void => {
    if (this.isOpen && event.target instanceof Node && !this.contains(event.target)) this.setOpen(false);
  };

  private readonly onClick = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const node = target.closest<HTMLElement>('[data-action]');
    const action = node?.dataset['action'];
    if (action === 'toggle') this.setOpen(!this.isOpen);
    if (action === 'pick') this.pick(node?.dataset['id']);
  };

  private pick(id: string | undefined): void {
    if (id === undefined) return;
    document.documentElement.dataset['glass'] = id;
    globalThis.localStorage?.setItem(KEY, id);
    this.querySelectorAll<HTMLElement>('[data-action="pick"]').forEach((el) => {
      el.setAttribute('aria-checked', String(el.dataset['id'] === id));
    });
  }

  private setOpen(open: boolean): void {
    this.isOpen = open;
    this.querySelector<HTMLElement>('.gl-pal__pop')?.setAttribute('data-open', String(open));
    this.querySelector<HTMLElement>('.gl-pal__fab')?.setAttribute('aria-expanded', String(open));
  }
}

defineComponent('glass-palette', GlassPalette);
