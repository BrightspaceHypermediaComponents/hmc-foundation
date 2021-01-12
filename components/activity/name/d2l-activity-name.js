import './custom/d2l-activity-name-learning-path.js';
import './custom/d2l-activity-name-course.js';
import '../../common/d2l-hc-name.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

class ActivityName extends LitElement {
	render() {
		return html`<d2l-hc-name></d2l-hc-name>`;
	}
}

customHypermediaElement('d2l-activity-name', ActivityName);
