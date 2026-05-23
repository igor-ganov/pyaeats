import { LightWebComponent, defineComponent } from '../define.ts';
import { cart } from '~/lib/cart.ts';

class GlassCartBadge extends LightWebComponent {
  private unsubscribe?: () => void;

  protected render(): void {
    this.innerHTML = `<span class="gl__cart-badge" data-count="0">0</span>`;
  }

  protected override afterRender(): void {
    this.paint(cart.count());
    this.unsubscribe = cart.subscribe(() => this.paint(cart.count()));
  }

  public disconnectedCallback(): void {
    this.unsubscribe?.();
  }

  private paint(n: number): void {
    const badge = this.querySelector<HTMLElement>('.gl__cart-badge');
    if (badge === null) return;
    const changed = badge.getAttribute('data-count') !== String(n);
    badge.textContent = String(n);
    badge.setAttribute('data-count', String(n));
    if (changed && n > 0) {
      badge.classList.remove('is-bump');
      void badge.offsetWidth; // restart the animation
      badge.classList.add('is-bump');
    }
  }
}

defineComponent('glass-cart-badge', GlassCartBadge);
