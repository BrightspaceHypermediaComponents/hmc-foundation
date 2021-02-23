
import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import '@brightspace-ui-labs/accordion/accordion.js';
import { css, LitElement } from 'lit-element/lit-element';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';

class ActivityAvailabilityDatesEditor extends LitElement {

	static get styles() {
		return [labelStyles, css`
			:host([hidden]) {
				display: none;
			}
			:host {
				display: flex;
				flex-direction: column;
			}
		`];
	}

	render() {

		return html`
		<d2l-labs-accordion-collapse
		flex header-border>
		<span slot="header">
			Words!
		</span>
		<ul slot="summary">
			More words!
		</ul>
		</d2l-labs-accordion-collapse>
		`;
	}
}

customHypermediaElement('d2l-activity-editor-card', ActivityAvailabilityDatesEditor);
