import { LitElement, html, css } from 'lit';

class TaggingQuestion extends LitElement {
  static get properties() {
    return {
      question: { type: String },
      image: { type: String },
      tags: { type: Array },
      selectedTags: { type: Array },
      correctTags: { type: Array },
      incorrectTags: { type: Array },
      checkDisabled: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.question = '';
    this.image = '';
    this.tags = [];
    this.selectedTags = [];
    this.correctTags = [];
    this.incorrectTags = [];
    this.checkDisabled = false;
  }

  static get styles() {
    return css`
      .question {
        margin-bottom: 20px;
      }

      .image {
        margin-bottom: 20px;
      }

      .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
      }

      .tag {
        padding: 5px 10px;
        background-color: white;
        border: 1px solid white;
        border-radius: 5px;
        cursor: pointer;
      }

      .tag.selected {
        background-color: #9cfb9c;
      }

      .tag.correct {
        border-color: #0bf10b
      }

      .tag.incorrect {
        border-color: #ff0000
      }

      .check-button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      .check-button:disabled {
        background-color: white;
        cursor: not-allowed;
      }

      .feedback {
        margin-top: 20px;
      }
    `;
  }

  render() {
    return html`
      <!-- Add html -->
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadTagData();
  }

  async loadTagData() {
    try {
      const response = await fetch('tag-data.json');
      const data = await response.json();
      this.tags = this.shuffleArray(data);
    } catch (error) {
      console.error('Error loading tag data:', error);
    }
  }
}

customElements.define('tagging-question', TaggingQuestion);
