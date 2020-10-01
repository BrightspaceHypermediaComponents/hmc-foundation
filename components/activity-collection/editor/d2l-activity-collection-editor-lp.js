import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';
import { html } from '../../framework/hypermedia-components.js';

const rels = Object.freeze({
	collection: 'https://activities.api.brightspace.com/rels/activity-collection',
	item: 'item'
});

class CollectionEditor extends HypermediaLitMixin(LitElement) {
	static get properties() {
		return {
			items: { type: Array, observable: observableTypes.subEntities, rel: rels.item, route: [{observable: observableTypes.link, rel: rels.collection}] }
		};
	}

	static get styles() {
		return [ css`` ];
	}

	constructor() {
		super();
		this.items = [];
	}

	render() {
		return html`
			<d2l-list>
				${this.items.map(href => html`<d2l-list-item>${href}</d2l-list-item>`)}
			</d2l-list>
		`;
	}

}
customElements.define('d2l-activity-collection-editor-lp', CollectionEditor);
