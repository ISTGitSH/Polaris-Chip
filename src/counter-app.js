import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {

    static get tag() {
      return 'counter-app';
    }
  
    constructor() {
      super();
      this.counter=0;
      this.min=0;
      this.max=100;
      this.title = "Counter";
    }

    static get properties() {
        return {
            counter: {type: Number},
            min: {type: Number},
            max: {type: Number}
        };
    }

    static get styles() {
        return css`
            :host {
                display: block;
                font-family: 'Arial', sans-serif;
            }

        :host([number="16"]) .button {
            color: orange;
        }
        
        .counter {
            font-size: 72px;
            text-align: center;
            color: ${CounterApp.getCounterColor(this.counter, this.min, this.max)};
        }

        .button-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }

        .button {
            padding: 10px 20px;
            margin: 0 10px;
            background-color: red;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 20px;
        }

        .button:hover {
            background-color: orange;
        }

        .button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        `;
    }

    static getCounterColor(counter, min, max) {
        if (counter === min || counter === max || counter === 18 || counter === 21) {
            return 'red';
        }
        return 'black';
    }

    increment() {
        if (this.counter < this.max) {
            this.counter ++;
            this.requestUpdate('counter');
        }
    }
    decrement() {
        if (this.counter > this.min) {
            this.counter --;
            this.requestUpdate('counter');
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('increment', this.increment);
        this.addEventListener('decrement', this.decrement);
    }
    render() {
        return html` 
        <div class="counter">${this.counter}</div>
        <div class="button-container">
            <button class="button" ?disabled="${this.min === this.counter}" @click="${() => this.dispatchEvent(new CustomEvent('decrement'))}">-</button>
            <button class="button" ?disabled="${this.max === this.counter}" @click="${() => this.dispatchEvent(new CustomEvent('increment'))}">+</button>
    </div>
        `;
        
    }
    }

customElements.define(CounterApp.tag, CounterApp);
