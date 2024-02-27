import { LitElement, html, css } from 'lit';

class CampusAlert extends LitElement {
  static get properties() {
    return {
      isOpen: { type: Boolean },
      status: { type: String },
      date: { type: String },
      sticky: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.isOpen = true;
    this.status = 'notice';
    this.date = '';
    this.sticky = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        background-color: var(--alert-background, white);
        color: var(--alert-text-color, black);
        padding: 16px;
        border-bottom: 2px solid white;
      }

      .alert {
        font-weight: bold;
      }

      .date {
        font-size: 0.8em;
      }

      .sticky {
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .blue {
        background-color: blue;
        color: white;
      }

      .warning {
        background-color: orange;
        color: white;
      }

      .alert {
        background-color: red;
        color: white;
      }
    `;
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      localStorage.setItem('alertClosed', 'true');
    } else {
      localStorage.removeItem('alertClosed');
    }
    this.requestUpdate();
  }

  handleSticky() {
    const toggleButton = this.shadowRoot.querySelector('.alert');
    if (window.pageYOffset > toggleButton.offsetTop) {
      toggleButton.classList.add('sticky');
    } else {
      toggleButton.classList.remove('sticky');
    }
  }

  render() {
    return html`
      <div class="alert ${this.status} ${this.sticky ? 'sticky' : ''}" role="alert" aria-expanded=${this.isOpen} @click=${this.toggle} @keydown=${this.toggle}>
        <slot></slot>
        <div class="date">Date: ${this.date}</div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.sticky) {
      window.addEventListener('scroll', () => {
        this.handleSticky();
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.sticky) {
      window.removeEventListener('scroll', () => {
        this.handleSticky();
      });
    }
  }
}

customElements.define('campus-alert', CampusAlert);
