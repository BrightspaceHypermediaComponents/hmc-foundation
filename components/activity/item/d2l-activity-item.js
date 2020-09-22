import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import '../name/d2l-activity-name.js';
import '../type/d2l-activity-type.js';
import '../image/d2l-activity-image.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html } from '../../../framework/hypermedia-components.js';

const rels = Object.freeze({
	activityUsage: 'https://activities.api.brightspace.com/rels/activity-usage'
});

class ActivityItem extends HypermediaLitMixin(LitElement) {
	static get properties() {
		return {
			_activityHref: { type: String, observable: observableTypes.link, rel: rels.activityUsage }
		};
	}

	static get styles() {
		return [ css`` ];
	}

	render() {
		return html`
			<d2l-list-item>
				<d2l-activity-image href="${this._activityHref}" .token="${this.token}" slot="illustration"></d2l-activity-image>
				<d2l-list-item-content> <!-- This would actually be unique to the type -->
					<d2l-activity-name href="${this._activityHref}" .token="${this.token}"></d2l-activity-name>
					<d2l-activity-type href="${ifDefined(this._activityHref)}" .token="${this.token}" slot="supporting-info"></d2l-activity-type>
				</d2l-list-item-content>
			</d2l-list-item>
		`;
	}
}
customElements.define('d2l-activity-item', ActivityItem);

/*import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import '@brightspace-ui-labs/list-item-accumulator/list-item-accumulator.js';
import '../name/d2l-activity-name.js';
import '../type/d2l-activity-type.js';
import '../image/d2l-activity-image.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html } from '../../../framework/hypermedia-components.js';

const rels = Object.freeze({
	activityUsage: 'https://activities.api.brightspace.com/rels/activity-usage'
});

class ActivityItem extends HypermediaLitMixin(LitElement) {
	static get properties() {
		return {
			_activityHref: { type: String, observable: observableTypes.link, rel: rels.activityUsage }
		};
	}

	static get styles() {
        return [ css`
            .d2l-activitiy-collection-list-item-illustration {
                display: grid;
                grid-template-areas: only-one;
                grid-template-columns: 100%;
                grid-template-rows: 100%;
                position: relative;
            }
        ` ];
    }

    render() {
        return html`
            <d2l-labs-list-item-accumulator key="${1}" drag-handle-text="${"text 101"}" draggable>
                <div slot="illustration" class="d2l-activitiy-collection-list-item-illustration">
                    <d2l-activity-image href="${ifDefined(this._activityHref)}" .token="${this.token}"></d2l-activity-name>
                </div>
                <d2l-activity-name href="${ifDefined(this._activityHref)}" .token="${this.token}"></d2l-activity-name>
            </d2l-labs-list-item-accumulator>
        `
    }

}
customElements.define('d2l-activity-item', ActivityItem);*/
