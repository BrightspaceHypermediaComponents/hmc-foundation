import { fetch } from '@brightspace-hmc/foundation-engine/state/fetch.js';
import { SirenSummonAction } from '@brightspace-hmc/foundation-engine/state/observable/SirenSummonAction.js';
import { telemetry } from './d2l-w2d-telemetry';

export class W2dSummonAction extends SirenSummonAction {

	static definedProperty({ name: id, token, verbose, start, page, pageSize, end }) {
		return { id, token, verbose, start, end, page, pageSize };
	}

	async addObserver(observer, property, { method, route, start, page, pageSize, end } = {}) {
		const queryParams = {};
		this._telemetryPage = page.replace(/^_page/, '').toLowerCase();
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
		this._setStartDate(observer[start]);
		this._setEndDate(observer[end]);
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
		await this._fetchRoutedState();
	}

	async _fetchRoutedState() {
		if (this._routes.size > 0 && this._href && this._token) {
			this.routedState = await this.createRoutedState(this.href, this._token.rawToken);
			this._routes.forEach((route, observer) => {
				this.routedState.addObservables(observer, route);
			});

			this.routedState.fetchStatus.waitForNextFetch.then(() => {
				telemetry.markFetchStart(this._telemetryPage);
				/*
				let startMark;
				switch (this._telemetryPage) {
					case '_pageUpcoming':
						startMark = telemetry.markLoadUpcomingStart();
						break;
					case '_pageOverdue':
						startMark = telemetry.markLoadOverdueStart();
						break;
				}
				*/
				console.log('Fetching:', this.routedState._href);
				const start = performance.now();

				this.routedState._fetchStatus.complete.then(res => {
					telemetry.markFetchEnd(this._telemetryPage, res.properties.pagingTotalResults);
					/*
					switch (this._telemetryPage) {
						case '_pageUpcoming':
							telemetry.markLoadUpcomingEnd(startMark, res.properties.pagingTotalResults);
							break;
						case '_pageOverdue':
							telemetry.markLoadOverdueEnd(startMark, res.properties.pagingTotalResults);
							break;
					}
					*/

					const end = performance.now();
					console.log(`Finished in ${end - start} miliseconds`);
				});
			});
			await fetch(this.routedState);
		}
	}

	async _setEndDate(endDate) {
		if (!endDate || this._endDate === endDate) return;
		this._endDate = endDate;
		if (!this._startDate) return;
		return await this._fetchRoutedState();
	}

	async _setPage(page) {
		if (!page || this._page === page) return;
		this._page = page;
		return await this._fetchRoutedState();
	}

	async _setStartDate(startDate) {
		if (!startDate || this._startDate === startDate) return;
		this._startDate = startDate;
		if (!this._endDate) return;
		return await this._fetchRoutedState();
	}
}
