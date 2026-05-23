import { LightWebComponent, defineComponent } from '../define.ts';
import { cart } from '~/lib/cart.ts';
import type { CartLine } from '~/lib/cart.ts';
import { formatGs } from '~/data/stores.ts';
import { u } from '~/lib/url.ts';

const FEE_GS = 8000;

class GlassCartView extends LightWebComponent {
  private unsubscribe?: () => void;
  private ordered = false;

  protected render(): void {
    this.paint();
  }

  protected override afterRender(): void {
    this.addEventListener('click', this.onClick);
    this.unsubscribe = cart.subscribe(() => this.paint());
  }

  public disconnectedCallback(): void {
    this.unsubscribe?.();
    this.removeEventListener('click', this.onClick);
  }

  private readonly onClick = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const node = target.closest<HTMLElement>('[data-act]');
    if (node === null) return;
    const act = node.dataset['act'];
    const id = node.dataset['id'];

    if (act === 'checkout') {
      cart.clear();
      this.ordered = true;
      this.paint();
      return;
    }
    if (id === undefined) return;
    const line = cart.read().find((l) => l.id === id);
    if (line === undefined) return;
    if (act === 'inc') cart.setQty(id, line.qty + 1);
    if (act === 'dec') cart.setQty(id, line.qty - 1);
    if (act === 'remove') cart.remove(id);
  };

  private paint(): void {
    const lines = cart.read();
    if (lines.length === 0) {
      this.innerHTML = this.ordered ? this.confirmationHtml() : this.emptyHtml();
      return;
    }
    this.ordered = false;
    const subtotal = cart.subtotal();
    this.innerHTML = `
      <div class="gl__panel">
        ${lines.map(lineHtml).join('')}
        <div class="gl__totals">
          <div class="gl__total-row"><span>Subtotal</span><span>${formatGs(subtotal)}</span></div>
          <div class="gl__total-row"><span>Envío</span><span>${formatGs(FEE_GS)}</span></div>
          <div class="gl__total-row is-grand"><span>Total</span><span>${formatGs(subtotal + FEE_GS)}</span></div>
          <button class="gl__cta gl__checkout" type="button" data-act="checkout">Confirmar pedido · ${formatGs(subtotal + FEE_GS)}</button>
        </div>
      </div>`;
  }

  private emptyHtml(): string {
    return `
      <div class="gl__panel gl__empty">
        <div class="gl__empty-emoji">🛒</div>
        <h3>Tu carrito está vacío</h3>
        <p>Agregá platos desde cualquier tienda.</p>
        <a class="gl__cta" href="${u('/c/glass')}" style="margin-top:16px">Explorar tiendas</a>
      </div>`;
  }

  private confirmationHtml(): string {
    return `
      <div class="gl__panel gl__empty">
        <div class="gl__empty-emoji">🎉</div>
        <h3>¡Pedido confirmado!</h3>
        <p>Tu comida está en camino a Villa Morra.</p>
        <a class="gl__cta" href="${u('/c/glass')}" style="margin-top:16px">Volver al inicio</a>
      </div>`;
  }
}

const lineHtml = (l: CartLine): string => `
  <div class="gl__cart-line">
    <div class="gl__cart-img">${l.emoji}</div>
    <div class="gl__cart-info"><strong>${l.name}</strong><span>${formatGs(l.priceGs)}</span></div>
    <div class="gl__stepper">
      <button class="gl__step" type="button" data-act="dec" data-id="${l.id}" aria-label="Quitar uno">−</button>
      <span class="gl__step-qty">${l.qty}</span>
      <button class="gl__step" type="button" data-act="inc" data-id="${l.id}" aria-label="Agregar uno">+</button>
    </div>
    <button class="gl__cart-remove" type="button" data-act="remove" data-id="${l.id}" aria-label="Eliminar">🗑</button>
  </div>`;

defineComponent('glass-cart-view', GlassCartView);
