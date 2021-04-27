import { fetch } from '@brightspace-hmc/foundation-engine/state/fetch.js';
import { SirenSummonAction } from '@brightspace-hmc/foundation-engine/state/observable/SirenSummonAction.js';

export class W2dSummonAction extends SirenSummonAction {

	static definedProperty({ name: id, token, verbose, startDate, endDate, collapsed }) {
		return { id, token, verbose, startDate, endDate, collapsed };
	}

	addObserver(observer, property, { method, route, startDate, endDate } = {}) {
		if (startDate && endDate) {
			this.setQueryParams({ start: observer[startDate], end: observer[endDate], embed: false });
		}
		super.addObserver(observer, property, { method, route });
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
			fetch(this.routedState);
		}
		this._updateAction();
	}
}
