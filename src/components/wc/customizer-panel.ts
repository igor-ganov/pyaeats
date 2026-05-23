import { LightWebComponent, defineComponent } from './define.ts';

/* =========================================================================
   <customizer-panel>
   Floating drawer to mix the design axes (Paleta / Forma) and fine-tune
   radii / spacing tokens. Axis choices are written to
   <html data-palette|data-shape> and persisted; slider tokens are written
   as inline CSS custom properties on <html>. Everything lives in
   localStorage so it survives navigation and reloads.
   ========================================================================= */

const TOKEN_KEY = 'pya.tokens';
type TokenValueMap = Record<string, string>;

type AxisName = 'palette' | 'shape';
interface AxisOption { readonly value: string; readonly label: string }

const DEFAULTS: Readonly<Record<AxisName, string>> = { palette: 'apetitoso', shape: 'redondo' };

const SHAPES: readonly AxisOption[] = [
  { value: 'redondo', label: 'Redondo' },
  { value: 'suave',   label: 'Suave' },
  { value: 'recto',   label: 'Recto' },
  { value: 'pildora', label: 'Píldora' },
];

const PALETTES: readonly (AxisOption & { readonly a: string; readonly b: string })[] = [
  { value: 'apetitoso', label: 'Apetitoso', a: '#ff5a1f', b: '#e11d48' },
  { value: 'mango',     label: 'Mango',     a: '#f59e0b', b: '#ea580c' },
  { value: 'tropical',  label: 'Tropical',  a: '#16a34a', b: '#f97316' },
  { value: 'frutilla',  label: 'Frutilla',  a: '#e11d48', b: '#db2777' },
  { value: 'uva',       label: 'Uva',       a: '#7c3aed', b: '#db2777' },
  { value: 'paraguay',  label: 'Paraguay',  a: '#d52b1e', b: '#0038a8' },
];

const SLIDERS = [
  { token: '--r-md',    label: 'Radio de tarjetas', min: 0,   max: 28,  step: 1, fallback: '16',  unit: 'px' },
  { token: '--r-lg',    label: 'Radio del hero',    min: 0,   max: 44,  step: 1, fallback: '22',  unit: 'px' },
  { token: '--gap',     label: 'Espaciado',         min: 8,   max: 28,  step: 1, fallback: '16',  unit: 'px' },
  { token: '--thumb-h', label: 'Altura de fotos',   min: 110, max: 210, step: 2, fallback: '156', unit: 'px' },
] as const;

const readTokens = (): TokenValueMap => {
  const raw = globalThis.localStorage?.getItem(TOKEN_KEY);
  if (raw === null || raw === undefined) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};
    const out: TokenValueMap = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === 'string') out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
};
const writeTokens = (state: TokenValueMap): void => {
  globalThis.localStorage?.setItem(TOKEN_KEY, JSON.stringify(state));
};

const writeAxis = (axis: AxisName, value: string): void => {
  globalThis.localStorage?.setItem(`pya.${axis}`, value);
};
const clearAxis = (axis: AxisName): void => {
  globalThis.localStorage?.removeItem(`pya.${axis}`);
};

const applyToken = (token: string, value: string): void => {
  document.documentElement.style.setProperty(token, value);
};
const resetToken = (token: string): void => {
  document.documentElement.style.removeProperty(token);
};

/** Re-apply persisted inline tokens once component scripts load (pre-paint head
 *  script already did it; this is a defensive re-apply). */
export const bootstrapTokens = (): void => {
  const tokens = readTokens();
  for (const [k, v] of Object.entries(tokens)) applyToken(k, v);
};

const currentAxis = (axis: AxisName): string =>
  document.documentElement.dataset[axis] ?? DEFAULTS[axis];

class CustomizerPanelElement extends LightWebComponent {
  private tokens: TokenValueMap = readTokens();
  private isOpen = false;

  protected render(): void {
    this.innerHTML = `
      <button type="button" class="customizer__fab" data-action="toggle"
              aria-label="Abrir personalizador de diseño" aria-expanded="${this.isOpen}" title="Personalizar diseño">
        <span aria-hidden="true">🎨</span>
      </button>

      <aside class="customizer__panel" data-open="${this.isOpen}" aria-hidden="${!this.isOpen}">
        <header class="customizer__header">
          <div>
            <p class="customizer__eyebrow">Diseño en vivo</p>
            <h2 class="customizer__title">Personalizar</h2>
          </div>
          <button type="button" class="customizer__close" data-action="close" aria-label="Cerrar">×</button>
        </header>

        ${this.renderPaletteAxis()}
        ${this.renderAxis('shape', 'Forma de los bloques', SHAPES)}

        <section class="customizer__section">
          <h3 class="customizer__group-title">Ajuste fino</h3>
          ${SLIDERS.map((s) => this.renderRange(s)).join('')}
        </section>

        <footer class="customizer__footer">
          <button type="button" class="customizer__reset" data-action="reset">Restablecer todo</button>
        </footer>
      </aside>
    `;
  }

  private renderAxis(axis: AxisName, title: string, options: readonly AxisOption[]): string {
    const active = currentAxis(axis);
    return `
      <section class="customizer__section">
        <h3 class="customizer__group-title">${title}</h3>
        <div class="customizer__chips" role="radiogroup" aria-label="${title}">
          ${options.map((o) => `
            <button type="button" class="customizer__chip" role="radio"
                    data-action="axis" data-axis="${axis}" data-value="${o.value}"
                    aria-checked="${active === o.value}">${o.label}</button>
          `).join('')}
        </div>
      </section>
    `;
  }

  private renderPaletteAxis(): string {
    const active = currentAxis('palette');
    return `
      <section class="customizer__section">
        <h3 class="customizer__group-title">Paleta</h3>
        <div class="customizer__swatches" role="radiogroup" aria-label="Paleta">
          ${PALETTES.map((p) => `
            <button type="button" class="customizer__swatch" role="radio"
                    data-action="axis" data-axis="palette" data-value="${p.value}"
                    aria-checked="${active === p.value}" title="${p.label}"
                    style="--sw-a: ${p.a}; --sw-b: ${p.b};">
              <span class="visually-hidden">${p.label}</span>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  private renderRange(spec: {
    readonly token: string; readonly label: string;
    readonly min: number; readonly max: number; readonly step: number;
    readonly fallback: string; readonly unit: string;
  }): string {
    const stored = this.tokens[spec.token];
    const numeric = stored === undefined ? spec.fallback : (stored.replace(/[^\d.\-]/g, '') || spec.fallback);
    return `
      <label class="customizer__range">
        <span class="customizer__range-label">
          <span>${spec.label}</span><output>${numeric}${spec.unit}</output>
        </span>
        <input type="range" min="${spec.min}" max="${spec.max}" step="${spec.step}" value="${numeric}"
               data-action="range" data-token="${spec.token}" data-unit="${spec.unit}" aria-label="${spec.label}"/>
      </label>
    `;
  }

  protected override afterRender(): void {
    this.addEventListener('click', this.handleClick);
    this.addEventListener('input', this.handleInput);
  }

  public disconnectedCallback(): void {
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('input', this.handleInput);
  }

  private readonly handleClick = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const node = target.closest<HTMLElement>('[data-action]');
    const action = node?.dataset['action'];
    switch (action) {
      case 'toggle': this.setOpen(!this.isOpen); break;
      case 'close':  this.setOpen(false); break;
      case 'reset':  this.resetAll(); break;
      case 'axis':   this.applyAxis(node); break;
      default: /* noop */
    }
  };

  private readonly handleInput = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.dataset['action'] !== 'range') return;
    const token = target.dataset['token'];
    if (token === undefined) return;
    const unit = target.dataset['unit'] ?? '';
    const value = `${target.value}${unit}`;
    this.tokens = { ...this.tokens, [token]: value };
    applyToken(token, value);
    writeTokens(this.tokens);
    const output = target.parentElement?.querySelector('output');
    if (output !== null && output !== undefined) output.textContent = `${target.value}${unit}`;
  };

  private applyAxis(node: HTMLElement | null | undefined): void {
    if (node === undefined || node === null) return;
    const axisRaw = node.dataset['axis'];
    const value = node.dataset['value'];
    if (value === undefined) return;
    if (axisRaw !== 'palette' && axisRaw !== 'shape') return;
    const axis: AxisName = axisRaw;
    document.documentElement.dataset[axis] = value;
    writeAxis(axis, value);
    const group = node.closest<HTMLElement>('[role="radiogroup"]');
    group?.querySelectorAll<HTMLElement>('[data-action="axis"]').forEach((btn) => {
      btn.setAttribute('aria-checked', String(btn.dataset['value'] === value));
    });
  }

  private setOpen(open: boolean): void {
    this.isOpen = open;
    const panel = this.querySelector<HTMLElement>('.customizer__panel');
    if (panel !== null) {
      panel.dataset['open'] = String(open);
      panel.setAttribute('aria-hidden', String(!open));
    }
    this.querySelector<HTMLElement>('.customizer__fab')?.setAttribute('aria-expanded', String(open));
  }

  private resetAll(): void {
    for (const token of Object.keys(this.tokens)) resetToken(token);
    for (const s of SLIDERS) resetToken(s.token);
    this.tokens = {};
    writeTokens(this.tokens);
    (['palette', 'shape'] as const).forEach((axis) => {
      clearAxis(axis);
      document.documentElement.dataset[axis] = DEFAULTS[axis];
    });
    this.render();
    this.afterRender();
    this.setOpen(true);
  }
}

defineComponent('customizer-panel', CustomizerPanelElement);
