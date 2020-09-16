import '../../activity-collection/editor/d2l-activity-collection-editor-lp.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import { customHypermediaElement, html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';
import { LitElement, css } from 'lit-element/lit-element.js';

const rels = Object.freeze({
	collection: 'https://activities.api.brightspace.com/rels/activity-collection',
	item: 'item'
});

class ActivityCollectionEditorMainLP extends HypermediaLitMixin(LitElement) {

    static get properties() {
		return {
			items: { type: Array, observable: observableTypes.subEntities, rel: rels.item, route: [{observable: observableTypes.link, rel: rels.collection}] }
		};
	}

    static get styles() {
        return [ css`
            .d2l-activity-collection-body {
                margin: auto;
                max-width: 1230px;
                padding: 0 1.5rem;
            }
            .d2l-activity-collection-body-content {
                max-width: 820px;
                padding: 0 0.35rem;
            }
            .d2l-activity-collection-activities {
                margin: 0 -1.5rem;
                max-width: 881px;
                padding: 0 0.05rem;
            }
            .d2l-activity-collection-list-actions {
                align-items: baseline;
                display: flex;
                justify-content: space-between;
                margin: 0.9rem 0;
                max-width: 820px;
                position: relative;
            }
        ` ];
	}

	constructor() {
		super();
        this.items = [];
	}

    render() {
        return html`
            <div class="d2l-activity-collection-body">
                <div class="d2l-activity-collection-body-content">
                    <div class="d2l-activity-collection-list-actions">
                        <d2l-button primary>add Activity</d2l-button>
                        <div class="d2l-body-compact">Count: ${this.items.length}</div>
                    </div>
                </div>
                <div class="d2l-activity-collection-activities">
                    <d2l-list>
                        ${this.items.map(href => html`<d2l-list-item>${href}</d2l-list-item>`)}
                    </d2l-list>
                </div>
            </div>
        `;
    }

}

customHypermediaElement('d2l-activity-collection-editor-learning-path', ActivityCollectionEditorMainLP, 'd2l-activity-collection-editor-main', [['learning-path']]);