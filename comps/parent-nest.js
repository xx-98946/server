import { LitElement, html, css } from "/static/lit-core.min.js";

class ParentNest extends LitElement {
    static properties = {
        name: {},
    };

    render() {
        return html`
        <h1>父子组件</h1>
        <simple-greeting></simple-greeting>
    `;
    }
}

customElements.define('parent-nest', ParentNest);

