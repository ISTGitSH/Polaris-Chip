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
        margin-left: 20px;
        max-width: 30%;
        height: auto;
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
        margin-left: 20px;
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
      <div class="question">${this.question}</div>
      ${this.image ? html`<img src="${this.image}" alt="Question Image" class="image">` : ''}
      <div class="tags-container">
        ${this.tags.map(tag => html`
          <div 
            class="tag ${this.selectedTags.includes(tag) ? 'selected' : ''} ${this.correctTags.includes(tag) ? 'correct' : ''} ${this.incorrectTags.includes(tag) ? 'incorrect' : ''}" 
            @click="${() => this.toggleTag(tag)}"
            tabindex="0"
            role="button"
            aria-label="${tag}"
          >
            ${tag}
          </div>
        `)}
      </div>
      <button class="check-button" @click="${this.checkAnswers}" ?disabled="${this.checkDisabled}">Check Answer</button>
      ${this.correctTags.length > 0 || this.incorrectTags.length > 0 ? html`
        <div class="feedback">
          ${this.correctTags.map(tag => html`
            <div class="tag correct">${tag} - Correct</div>
          `)}
          ${this.incorrectTags.map(tag => html`
            <div class="tag incorrect">${tag} - Incorrect</div>
          `)}
        </div>
      ` : ''}
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
      this.correctTags = this.tags.filter(tag => tag.correct).map(tag => tag.tag);
    } catch (error) {
      console.error('Error loading tag data:', error);
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  toggleTag(tag) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags = [...this.selectedTags, tag];
    }
  }

  checkAnswers() {
    this.correctTags = [];
    this.incorrectTags = [];
    this.tags.forEach(tagObj => {
      if (this.selectedTags.includes(tagObj.tag)) {
        if (tagObj.correct) {
            this.correctTags.push(tagObj.tag);
      } else {
        this.incorrectTags.push(tagObj.tag);
      }
    }
    });
    this.checkDisabled = true;
  }
}

customElements.define('tagging-question', TaggingQuestion);
