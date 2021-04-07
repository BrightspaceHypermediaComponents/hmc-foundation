import '../../../common/d2l-hc-name.js';
import { LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { nothing } from 'lit-html';

export class ActivityDescriptionContent extends LitElement {
	render() {
		return nothing;
	}
}

customHypermediaElement('d2l-activity-description-content', ActivityDescriptionContent, 'd2l-activity-description', [['user-content-activity']]);
