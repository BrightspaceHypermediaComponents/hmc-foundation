import { css, html, LitElement } from 'lit-element/lit-element.js';

class W2DAttributeList extends LitElement {
	static get styles() {
		return [ css`
			:host {
				display: inline-flex;
				flex-flow: row wrap;
				overflow-y: hidden;
				height: 1rem;
			}
			::slotted(*) {
				display: flex;
				overflow: hidden;
				white-space: nowrap;
				align-items: center;
				flex-flow: row nowrap;
			}
			::slotted(*)::before {
				display: inline-block;
				width:18px;
				height:18px;
				content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' width='18px' height='18px' viewBox='0 0 18 18'><circle cx='9' cy='9' r='3' fill='%236E7376' fill-rule='evenodd'/></svg>");
			}
			::slotted(*:first-child)::before {
				content: "";
				width: 0;
				height: 0;
			}
		`];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		return html`<slot></slot>`;
	}

}
customElements.define('d2l-w2d-attribute-list', W2DAttributeList);
