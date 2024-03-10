import { LitElement, html, css } from "/static/lit-core.min.js";

class SimpleGreeting extends LitElement {
    static styles = css`p { color: blue }`;

    static properties = {
        name: { type: String },
    };

    constructor() {
        super();
        this.name = '世界';
    }

    render() {
        return html`<p>你好, ${this.name}!</p>`;
    }
}

customElements.define('simple-greeting', SimpleGreeting);