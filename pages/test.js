import { LitElement, html, css } from "/static/lit-core.min.js";
import "/comps/simple-greeting";
import "/comps/full-component";
import "/comps/properties-basic";
import "/comps/parent-nest";

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

  render() {
    return html`
            <h1>组件列表</h1>
            <a href="/api">/api</a>
            <simple-greeting></simple-greeting>
            <full-component></full-component>
            <properties-basic></properties-basic>
            <parent-nest></parent-nest>
            <hr />
    `;
  }
}
customElements.define('lit-page', TestPage);
