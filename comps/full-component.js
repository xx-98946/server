import { LitElement, html, css } from "/static/lit-core.min.js";

export class FullComponent extends LitElement {
  static properties = {
    greeting: {},
    planet: {},
  };
  static styles = css`
    :host {
      display: inline-block;
      padding: 10px;
      background: lightgray;
    }
    .planet {
      color: var(--planet-color, blue);
    }
  `;

  constructor() {
    super();
    this.greeting = '你好';
    this.planet = '世界';
  }

  render() {
    return html`
      <span @click=${this.togglePlanet}
        >${this.greeting}
        <span class="planet">${this.planet}</span>
      </span>
    `;
  }

  togglePlanet() {
    this.planet = this.planet === '世界' ? '火星' : '世界';
  }
}
customElements.define('full-component', FullComponent);
