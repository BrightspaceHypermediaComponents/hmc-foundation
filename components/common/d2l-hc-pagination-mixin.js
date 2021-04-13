import '@brightspace-ui-labs/pagination/pagination.js';
import { html } from 'lit-element/lit-element.js';
import { observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

export const HcPaginationMixin = superclass => class extends superclass {
	static get properties() {
		return {
			pagingInfo: { type: Object, observable: observableTypes.property },
			prev: { observable: observableTypes.link, rel: 'prev' },
			next: { observable: observableTypes.link, rel: 'next' }
		};
	}

	get totalPages() {
		if (!this.pagingInfo) return;
		return this.pagingInfo.total && this.pagingInfo.pageSize && Math.ceil(this.pagingInfo.total / this.pagingInfo.pageSize);
	}

	_renderPagination() {
		return this._loaded ? html`
			<d2l-labs-pagination page-number="${this.pagingInfo.page}" max-page-number="${this.totalPages}"></d2l-labs-pagination>
		`: null;
	}
};
