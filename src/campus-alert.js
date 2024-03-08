import { LitElement, html, css } from 'lit';

export class CampusAlert extends LitElement {
  static get tag() {
    return 'campus-alert'
  }

  constructor() {
    super();
    this.closedHeight = '50px';
    this.openHeight = '400px';
    this.open = true;
    this.status = 'notice';
    this.date = '';
    this.sticky = false;

    const storedStatus = localStorage.getItem('alertStatus');
    if (storedStatus === 'closed') {
      this.open = false;
      this.style.setProperty('--alert-height', this.closedHeight);
    }
  }

  static get styles() {
    return css`
      :host([sticky]) .alert-content {
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      :host([status="notice"]) .alert-content {
        background-color: var(--notice-bg, #2600ff);
        color: var(--notice-text, #ffffff)
      }

      :host([status="warning"]) .alert-content {
        background-color: var(--warning-bg, #e6a714);
      }

      :host([status="alert"]) .alert-content {
        background-color: var(--alert-bg, #ff0000);
      }

      .alert-content {
        padding: 16px;
        max-height: var(--alert-height);
        overflow: hidden;
        transition: max-height 0.3s ease;
      }

      .closed .alert-content {
        max-height: var(--closed-height);
      }

      @media (max-width: 400px) {
        :host([sticky]) .alert-content {
          position: sticky;
          top: 0;
        }

        .closed .alert-content {
          max-height: var(--closed-height);
        }
      }

      .toggle-button {
        cursor: pointer;
        border: none;
        background: none;
        color: #fff;
        font-size: 16px;
      }
    `;
  }

  toggleAlert() {
    if (this.sticky && !this.open) {
      this.open = true;
      this.style.setProperty('--alert-height', this.openHeight);
      localStorage.removeItem('alertStatus');
    } else {
      this.open = !this.open;
      if (this.open) {
        this.style.setProperty('--alert-height', this.openHeight);
      } else {
        this.style.setProperty('--alert-height', this.closedHeight);
        localStorage.setItem('alertStatus', 'closed');
      }
    }
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="alert-content ${this.open ? '' : 'closed'}" ?sticky="${this.sticky}">
        <div class="toggle-button" @click="${this.toggleAlert}">
          ${this.open ? 'Toggle Close' : 'Toggle Open'} Alert
        </div>
        <slot></slot>
        <div class="date">${this.date}</div>
      </div>
    `;
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      status: { type: String },
      date: { type: String },
      sticky: { type: Boolean, reflect: true },
      closedHeight: { type: String },
      openHeight: { type: String },
    };
  }
}

customElements.define(CampusAlert.tag, CampusAlert);
