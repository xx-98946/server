import { LitElement, html, css } from "$/static/lit-core.min.js";

class NameTag extends LitElement {
  static properties = {
    name: {},
  };

  render() {
    return html`Hello I'm ${this.name}.`;
  }
}

customElements.define('properties-basic', NameTag);

