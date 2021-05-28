import { fetch } from '@brightspace-hmc/foundation-engine/state/fetch.js';
import { SirenSummonAction } from '@brightspace-hmc/foundation-engine/state/observable/SirenSummonAction.js';

export class W2dSummonAction extends SirenSummonAction {

	static definedProperty({ name: id, token, verbose, start, page, pageSize, end }) {
		return { id, token, verbose, start, end, page, pageSize };
	}

	async addObserver(observer, property, { method, route, start, page, pageSize, end } = {}) {
		const queryParams = {};
		start && observer[start] && (queryParams['start'] = observer[start]);
		end && observer[end] && (queryParams['end'] = observer[end]);
		pageSize && observer[pageSize] && (queryParams['pageSize'] = observer[pageSize]);
		page && observer[page] && (queryParams['page'] = observer[page]);
		if (queryParams['start'] || queryParams['end'] || queryParams['pageSize'] || queryParams['page']) {
			queryParams['embed'] = false;
			this.setQueryParams(queryParams);
		}
		super.addObserver(observer, property, { method, route });
		this._setPage(observer[page]);
	}

	get method() {
		return 'GET';
	}

	async onServerResponse(json, error) {
		const sirenEntity = await super.onServerResponse(json, error);
		await this.routedState.setSirenEntity(sirenEntity);
		return sirenEntity;
	}

	async setSirenEntity(entity) {
		if (!entity || !entity.hasActionByName(this._name)) {
			this.action = { has: false };
			return;
		}

		this._rawSirenAction = entity.getActionByName(this._name);
		this._href = this._rawSirenAction.href;
		this._fields = this._decodeFields(this._rawSirenAction);
		this._method = this._rawSirenAction.method;
		if (this._routes.size > 0) {
			this.routedState = await this.createRoutedState(this.href, this._token.rawToken);
			this._routes.forEach((route, observer) => {
				this.routedState.addObservables(observer, route);
			});
			await fetch(this.routedState);
		}
	}

	async _setPage(page) {
		if (!page || this._page === page) return;
		this._page = page;
		if (this._routes.size > 0 && this._href && this._token) {
			this.routedState = await this.createRoutedState(this.href, this._token.rawToken);
			this._routes.forEach((route, observer) => {
				this.routedState.addObservables(observer, route);
			});
			await fetch(this.routedState);
		}
	}
}
