import '@brightspace-ui/core/components/inputs/input-text.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from 'foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from 'foundation-engine/framework/lit/HypermediaStateMixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';

const rels = Object.freeze({
	scoreOutOf: 'https://activities.api.brightspace.com/rels/score-out-of'
});

// todo: SELFLESS ENTITIES NEEDED
class ActivityEditorScore extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			entity: { type: Object, observable: observableTypes.entity }
		};
	}

	static get styles() {
		const styles = [
			labelStyles,
			css``
		];
		super.styles && styles.unshift(super.styles);
		return styles;
	}

	// this should be made moot by selfless entities
	get scoreOutOf() {
		// todo: get action on the subentity first, then the property if the action doesn't exist
		if (this.entity) {
			const subEntity = this.entity.getSubEntityByRel(rels.scoreOutOf);
			return subEntity && subEntity.properties && subEntity.properties.scoreOutOf;
		}
		return null;
	}

	render() {
		return html`
			<div id="score-info-container">
				<div id="score-out-of-container">
					<d2l-input-text
						id="score-out-of"
						label="Score out of"
						value="${this.scoreOutOf}"
						size=4
						novalidate
					></d2l-input-text>
				</div>
			</div>
		`;
	}
}

customHypermediaElement('d2l-activity-editor-score', ActivityEditorScore);
