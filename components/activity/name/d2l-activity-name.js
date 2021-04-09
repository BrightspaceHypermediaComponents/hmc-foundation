import './custom/d2l-activity-name-assignment.js';
import './custom/d2l-activity-name-checklist.js';
import './custom/d2l-activity-name-content.js';
import './custom/d2l-activity-name-course.js';
import './custom/d2l-activity-name-discussion.js';
import './custom/d2l-activity-name-quiz.js';
import './custom/d2l-activity-name-specialization.js';
import '../../common/d2l-hc-name.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

export class ActivityName extends LitElement {
	render() {
		return html`<d2l-hc-name></d2l-hc-name>`;
	}
}

customHypermediaElement('d2l-activity-name', ActivityName);
