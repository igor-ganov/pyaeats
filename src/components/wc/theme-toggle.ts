import { LightWebComponent, defineComponent } from './define.ts';

const STORAGE_KEY = 'pya.theme';

type ThemeMode = 'light' | 'dark';

const readStoredTheme = (): ThemeMode | undefined => {
  const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
  return raw === 'light' || raw === 'dark' ? raw : undefined;
};

const systemPrefersDark = (): boolean =>
  globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches === true;

export const applyTheme = (mode: ThemeMode): void => {
  document.documentElement.dataset['theme'] = mode;
  globalThis.localStorage?.setItem(STORAGE_KEY, mode);
};

/** Apply the persisted/system theme as early as possible. */
export const bootstrapTheme = (): void => {
  const stored = readStoredTheme();
  const resolved: ThemeMode = stored ?? (systemPrefersDark() ? 'dark' : 'light');
  document.documentElement.dataset['theme'] = resolved;
};

class ThemeToggleElement extends LightWebComponent {
  protected render(): void {
    const current: ThemeMode =
      document.documentElement.dataset['theme'] === 'dark' ? 'dark' : 'light';
    this.innerHTML = `
      <button
        type="button"
        class="tt"
        data-mode="${current}"
        aria-pressed="${current === 'dark'}"
        aria-label="Cambiar a tema ${current === 'dark' ? 'claro' : 'oscuro'}"
        title="Cambiar tema"
      >${current === 'dark' ? '☀️' : '🌙'}</button>
    `;
  }

  protected override afterRender(): void {
    const button = this.querySelector('button');
    if (button === null) return;
    button.addEventListener('click', this.toggle);
  }

  private readonly toggle = (): void => {
    const next: ThemeMode =
      document.documentElement.dataset['theme'] === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    this.render();
    this.afterRender();
  };
}

defineComponent('theme-toggle', ThemeToggleElement);
