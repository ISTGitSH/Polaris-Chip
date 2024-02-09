import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqEmBSHHDi3Mmz7KEppjziQ4u3963eTxX8KQ&usqp=CAU";
    this.message = "Dear Dad, I hope you have the best birthday ever! You have always been so supportive and kind and for that, I thank you. Happy 50th!";
    this.fancy = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: 'Arial', sans-serif;
      }
      :host([fancy]) {
        display: block;
        background-color: pink;
        border: 2px solid fuchsia;
        box-shadow: 10px 5px 5px red;
      }

.card {
  max-width: 400px;
  margin: 16px;
  border: 2px;
  border-radius: 8px;
  background-color: blue;
}

.card-header {
  background-color: red;
  padding: 8px;
  text-align: center;
}

.card-header h1 {
  margin: 10px;
  font-size: 30px;
  color: white;
}

.card-content {
  display: flex;
  padding: 8px;
  font-size: 20px;
}

.balloon-img {
  width: 200px;
  height: 300px;
}

.card-content p {
  margin: 0;
  color: white;
  margin: 16px;
}

.card-footer {
  padding: 25px;
  text-align: right;
  margin: -10px;
}

.details-btn {
  padding: 24px 48px;
  margin: 10px, 10px, 10px, 10px;
  background-color: red;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 20px
}

.card.change-color {
  background-color: green;
}

@media screen and (max-width: 800px) and (min-width: 501px) {
  .details-btn {
    display: inline-block;
  }
}

@media screen and (max-width: 500px) {
  .card {
    max-width: 100%;
  }

  .balloon-img {
    width: 100%; 
    height: auto; 
  }

  .card-content {
    flex-direction: column;
  }

  .details-btn {
    padding: 18px 36px;
  }
    }  
  `;
}

  render() {
    return html`
      <section class="card">
        <div class="card-header">
          <h1>${this.title}</h1>
        </div>
        <div class="card-content">
          <img src="${this.image}" alt="Balloon Image" class="balloon-img">
          <p>${this.message}</p>
    </div>
    <div class="card-footer">
      <a href="https://hax.psu.edu" class="details-btn">Details</a>
    </div>
  </section>
  `;
  }

  static get properties() {
    return {
      title: { type: String },
      image: { type: String },
      message: { type: String },
      fancy: { type: Boolean, reflect: true},
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
