import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class HaxcmsPartyUI extends DDD {
  static get tag() {
    return 'haxcms-party-ui';
  }

  constructor() {
    super();
      this.users = [];
      this.printUsers = [];
      this.userName = null;
  }

  static get styles() {
    return [
      super.styles,
        css`
          :host {
            display: block;
            }
            
          .party-ui-wrapper {
            padding: var(--ddd-spacing-5);
            margin: var(--ddd-spacing-4);
            width: 95%;
            text-align: center;
            border: var(--ddd-border-lg);
            border-color: var(--ddd-theme-default-original87Pink);
            border-radius: 5px;
            background-color: var(--ddd-theme-default-skyBlue);
        }

          .add {
            background-color: var(--ddd-theme-default-link);
            border: none;
            color: var(--ddd-theme-default-white);
            border-radius: 5px;
            font-size: 16px;
            font-weight: var(--ddd-font-primary-medium);
            padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
            margin: var(--ddd-spacing-3);
        }

        .add:focus,
        .add:hover {
            background-color: var(--ddd-theme-default-limestoneLight);
        }

        button:disabled {
            background-color: var(--ddd-theme-default-disabled);
        }

        .user-card {
            margin: var(--ddd-spacing-4);
            display: inline-flex;
            flex-wrap: wrap;
            text-align: center;
            border: var(--ddd-border-md);
            border-radius: 5px;
            border-color: var(--ddd-theme-default-original87Pink);
            padding: var(--ddd-spacing-2);
        }

        .user-char {
            margin: auto;
        }

        .userName {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: clip;
            width: 100%;
        }

        .remove {
            background-color: var(--ddd-theme-default-skyBlue);
            border-color: var(--ddd-theme-default-original87Pink);
            margin: auto;
            border-radius: 5px;
            width: 50%;
            font-size: 16px;
            font-weight: var(--ddd-front-primary-medium);
            padding: var(--ddd-spacing-2);
        }

        .remove:hover,
        .add:focus {
            background-color: var(--ddd-theme-default-limestoneLight);
            color: var(--ddd-theme-default-skyBlue);
        }
    `
        ];
    }

    inputScrub(e) {
        if (e.key === "Enter"){
            this.addUser(e);
            e.target.select();
        }
        const inputVal = e.target.value;
        const scrubVal = inputVal.replace(/[^a-z0-9]+$/g, "");
        e.target.value = scrubVal.slice(0, 10);
    }

    updateName(event) {
        this.userName = event.target.value;
    }

    addUser(e) {
        if(!this.users.filter(e => e.name === this.userName).length > 0) {
            const randomNumber = globalThis.crypto.getRandomValues(new Uint32Array(1))[0];
            const user = {
            id: randomNumber,
            name: this.userName,
            }
            
            this.users.push(user);
            this.requestUpdate();
            this.userName = "";
        }
        else {
            this.userName = "";
        }
    }

    removeUser(e) {
        this.users = this.users.filter(user => user.id !== parseInt(e.target.getAttribute('data-user-id')));
    }

    displayUsers(e) {
        this.printUsers = JSON.stringify(this.users);
    }

    render() {
        return html`
            <div class="party-ui-wrapper">
                <div class="input-wrapper">
                    <input type="text" class="username-add" onfocus="this.value=''" @keypress="${this.inputScrub}" @input="${this.updateName}" />
                    <button class="add" @click="${this.addUser}" ?disabled="${this.userName == null || this.userName == ""}">Add User</button>
                </div>
                <div class="users-panel">
                    ${this.users.map((user) => html`
                        <div class="user-card ${user.name}">
                            <rpg-character class="user-char" seed="${user.name}"></rpg-character>
                            <p class="userName">
                                ${user.name}
                            </p>
                            <button class="remove" data-user-id="${user.id}" @click="${this.removeUser}">Remove User</button>
                        </div>
                    `)}
                </div>
                <button class="save-users" @click="${this.displayUsers}">Save Users</button>
                <p class="array-display">
                    ${this.printUsers}
                </p>
            </div>
        `;
    }

    static get properties() {
        return {
            ...super.properties,
            users: { type: Array },
            userName: { type: String, attribute: "user-name", reflect: true },
            printUsers: { type: Array, attribute: "print-users", reflect: true }
        }
    }
}

globalThis.customElements.define(HaxcmsPartyUI.tag, HaxcmsPartyUI);
