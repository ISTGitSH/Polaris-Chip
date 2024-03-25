import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class HaxcmsPartyUI extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.partyMembers = [];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    return html`
      <style>

      </style>
      <div>
        <input type="text" id="usernameInput" placeholder="Enter username">
        <button id="addUserButton">Add User</button>
        <div id="partyMembersContainer"></div>
        <button id="savePartyButton">Save Party</button>
      </div>
    `;
  }

  setupEventListeners() {
    this.shadowRoot.getElementById("addUserButton").addEventListener("click", () => {
      this.addUser();
    });

    this.shadowRoot.getElementById("savePartyButton").addEventListener("click", () => {
      this.saveParty();
    });
  }

  addUser() {
    const usernameInput = this.shadowRoot.getElementById("usernameInput");
    const username = usernameInput.value.trim();

    // Check if username is not empty
    if (username) {
      this.partyMembers.push(username);
      this.renderPartyMembers();
    }

    // Clear the input field
    usernameInput.value = "";
  }

  renderPartyMembers() {
    const partyMembersContainer = this.shadowRoot.getElementById("partyMembersContainer");

    // Clear previous content
    partyMembersContainer.innerHTML = "";

    // Render each party member
    this.partyMembers.forEach((username) => {
      const character = document.createElement("rpg-character");
      character.seed = username; 
      partyMembersContainer.appendChild(character);

      // Display username below the character
      const usernameElement = document.createElement("div");
      usernameElement.textContent = username;
      partyMembersContainer.appendChild(usernameElement);
    });
  }

  saveParty() {
    alert("Party saved!");
  }
}

customElements.define("haxcms-party-ui", HaxcmsPartyUI);
