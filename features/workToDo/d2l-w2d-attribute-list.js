import { css, html, LitElement } from 'lit-element/lit-element.js';

class W2DAttributeList extends LitElement {
	static get styles() {
		return [ css`
			:host {
				display: inline-flex;
				flex-flow: row wrap;
				height: 1rem;
				overflow-y: hidden;
			}
			::slotted(*) {
				align-items: center;
				display: flex;
				flex-flow: row nowrap;
				overflow: hidden;
				white-space: nowrap;
			}
			::slotted(*)::before {
				content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' width='18px' height='18px' viewBox='0 0 18 18'><circle cx='9' cy='9' r='3' fill='%236E7376' fill-rule='evenodd'/></svg>");
				display: inline-block;
				height:18px;
				width:18px;
			}
			::slotted(*:first-child)::before {
				content: "";
				height: 0;
				width: 0;
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
