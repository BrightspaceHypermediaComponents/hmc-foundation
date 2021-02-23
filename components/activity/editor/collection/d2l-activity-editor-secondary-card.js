
import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import { css, LitElement } from 'lit-element/lit-element';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';

class ActivityEditorSecondaryCard extends LitElement {

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
		<d2l-activity-accordion-collapse header-border>
		<span slot="header">
		<h3>
		Additional Identification
		</h3>
		</span>
		</d2l-activity-accordion-collapse>
		`;
	}
}

customHypermediaElement('d2l-activity-editor-card', ActivityEditorSecondaryCard);

/*
<d2l-activity-accordion-collapse flex header-border>
		<span slot="header">
			<h3>
			Additional Identification
			</h3>
		</span>
		<span slot="content">
		Components go here.
		</span>
		</d2l-activity-accordion-collapse>
*/
