import { LitElement, html, css } from "$/static/lit-core.min.js";

export class TestPage extends LitElement {
  static properties = {
  };
  static styles = css`
    :host {
      display: block;
    }
  `;

  constructor() {
    super();
  }

  async getLinkList() {
    const res = await fetch("/api/linkList");
    const data = await res.json();
    console.log(data);
  }

  async changeLinkList() {
    const res = await fetch("/api/linkList", { method: "POST" });
    const data = await res.json();
    console.log(data);
  }

  render() {
    return html`
            <h1>组件列表</h1>
            <a href="/">/首页</a>
            <button @click=${this.getLinkList}>获取linkList</button>
            <button @click=${this.changeLinkList}>修改linkList</button>
    `;
  }
}
customElements.define('lit-page', TestPage);
