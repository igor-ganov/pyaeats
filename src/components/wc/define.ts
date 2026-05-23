/**
 * Idempotent custom-element registration.
 * Avoids "already defined" errors during HMR / repeated imports.
 */
export const defineComponent = (
  name: string,
  ctor: CustomElementConstructor,
): void => {
  if (customElements.get(name) === undefined) {
    customElements.define(name, ctor);
  }
};

/**
 * Base class for light-DOM web components. Light DOM is intentional:
 * tokens and component classes from global.css cascade in.
 */
export abstract class LightWebComponent extends HTMLElement {
  private connectedOnce = false;

  public connectedCallback(): void {
    if (!this.connectedOnce) {
      this.connectedOnce = true;
      this.render();
      this.afterRender();
    }
  }

  public attributeChangedCallback(): void {
    if (this.connectedOnce) {
      this.render();
      this.afterRender();
    }
  }

  protected abstract render(): void;

  protected afterRender(): void {
    // Hook for subclasses to wire up listeners.
  }
}
