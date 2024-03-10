import { LitElement, html, css } from "/static/lit-core.min.js";

export class ChildComp extends LitElement{
    render(){
        return html`
            <p>子组件</p>
        `
    }
}

customElements.define('child-comp', ChildComp);
