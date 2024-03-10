import { LitElement, html, css } from "/static/lit-core.min.js";
import { ChildComp } from "/home/child";

export class HomePage extends LitElement{
    render(){
        return html`
            <h1>首页内容</h1>
            <a href="/test">test</a>
            <child-comp></child-comp>
        `
    }
}

customElements.define('lit-page', HomePage);
