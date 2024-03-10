import { LitElement, html, css } from "/static/lit-core.min.js";

export class HomePage extends LitElement{
    render(){
        return html`
            <h1>首页内容</h1>
            <a href="/test">test</a>
        `
    }
}

customElements.define('lit-page', HomePage);
