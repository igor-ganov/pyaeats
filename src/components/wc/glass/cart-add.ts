import { LightWebComponent, defineComponent } from '../define.ts';
import { cart } from '~/lib/cart.ts';

/** Wraps a single "+" button that adds a menu item to the cart. */
class GlassCartAdd extends LightWebComponent {
  protected render(): void {
    this.innerHTML = `<button class="gl__add" type="button" aria-label="Agregar al carrito">＋</button>`;
  }

  protected override afterRender(): void {
    this.querySelector('button')?.addEventListener('click', this.add);
  }

  private readonly add = (): void => {
    const { id, name, emoji } = this.dataset;
    const priceGs = Number(this.dataset['price']);
    if (id === undefined || name === undefined || Number.isNaN(priceGs)) return;
    cart.add({ id, name, priceGs, emoji: emoji ?? '🍽️' });

    const button = this.querySelector<HTMLButtonElement>('button');
    if (button === null) return;
    button.classList.add('is-added');
    button.textContent = '✓';
    globalThis.setTimeout(() => {
      button.classList.remove('is-added');
      button.textContent = '＋';
    }, 850);
  };
}

defineComponent('glass-cart-add', GlassCartAdd);
