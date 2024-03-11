import { LitElement, html, css } from "$/static/lit-core.min.js";
import "$/home/LinkList";

export class HomePage extends LitElement {
    render() {
        return html`
            <h1>首页内容</h1>
            <a href="/test">test</a>
            <link-list></link-list>
        `
    }
}

customElements.define('lit-page', HomePage);
