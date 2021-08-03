import Events from 'd2l-telemetry-browser-client';
import { Rels } from 'siren-sdk/src/hypermedia-constants';

const W2D_TELEMETRY_ID = 'worktodo';
const baseNamespace = 'd2l-work-to-do';
const apiNamespace = `${baseNamespace}.api`;

const overdueMark = `${apiNamespace}.overdue`;
const W2D_OVERDUE_LOADED_MEASURE = `${overdueMark}.loaded`;

const upcomingMark = `${apiNamespace}.upcoming`;
const W2D_UPCOMING_LOADED_MEASURE = `${upcomingMark}.loaded`;

const viewNamespace = `${baseNamespace}.view`;
const W2D_VIEW_LOADED_MEASURE = `${viewNamespace}.loaded`;

const W2D_VIEW_LOAD_MEASURES = [W2D_OVERDUE_LOADED_MEASURE, W2D_UPCOMING_LOADED_MEASURE, W2D_VIEW_LOADED_MEASURE];
const W2D_LOAD_MORE_MEASURES = [W2D_OVERDUE_LOADED_MEASURE, W2D_UPCOMING_LOADED_MEASURE];

const appName = 'd2l-work-to-do';

class WorkToDoTelemetry {

	constructor() {
		this._custom = {};
		this._marks = {};
		this._createClient();
	}

	async logActivityNavigatedTo(href, type) {
		await this._logTelemetryEvent('NavigatedTo', href, type);
	}

	async logViewAllClicked(href) {
		await (await this._logTelemetryEvent('ViewAllClicked', href, 'ViewAll'));
	}

	markAndLogLoadMore() {
		this._logPerformanceEvent('LoadMore', Rels.Activities.nextPage, 'ActivitiesNextPage',  W2D_LOAD_MORE_MEASURES);
	}

	markAndLogWidgetLoaded(fullscreen) {
		this._logPerformanceEvent('LoadView', window.location.pathname, fullscreen ? 'Fullscreen' : 'Widget', W2D_VIEW_LOAD_MEASURES);
	}

	markFetchEnd(name, count = 0) {
		const data = { [`${name.charAt(0).toUpperCase()}${name.slice(1)}Count`]: count };
		this._markEventEnd(`${appName}.api.${name}.loaded`, this._marks[name], data);
	}

	markFetchStart(name) {
		this._marks[name] = this._markEventStart(`${appName}.api.${name}.start`);
	}

	async _createClient() {
		this._client = await window.D2L.Telemetry.CreateClient();
	}

	_logPerformanceEvent(action, href, type, measures) {
		if (!action || !href || !type || !measures) {
			return;
		}

		const timings = performance
			.getEntriesByType('measure')
			.filter((measure) => measures.includes(measure.name))
			.map((measure) => {
				performance.clearMeasures(measure.name); // remove measures that we took
				return measure;
			});

		const eventBody = new Events.PerformanceEventBody()
			.setAction(action)
			.setObject(encodeURIComponent(href), type, href)
			.addUserTiming(timings);

		measures.forEach((measure) => {
			const values = this._custom[measure];
			while (values && values.length) {
				const value = values.pop();
				eventBody.addCustom(value.name, value.value);
			}
		});

		const event = new Events.TelemetryEvent()
			.setType('PerformanceEvent')
			.setDate(new Date())
			.setSourceId(W2D_TELEMETRY_ID)
			.setBody(eventBody);

		return this._sendEvent(event);
	}

	_logTelemetryEvent(action, id, type) {
		if (!action || !id || !type) {
			return;
		}

		const eventBody = new Events.EventBody()
			.setAction(action)
			.setObject(encodeURIComponent(id), type, id);

		const event = new Events.TelemetryEvent()
			.setType('TelemetryEvent')
			.setDate(new Date())
			.setSourceId(W2D_TELEMETRY_ID)
			.setBody(eventBody);

		return this._sendEvent(event);
	}

	_markEventEnd(measure, startMark, custom) {
		if (startMark === undefined) {
			return;
		}

		performance.measure(measure, startMark);

		if (custom) {
			if (!this._custom[measure]) {
				this._custom[measure] = [];
			}

			Object.entries(custom).forEach(([name, value]) => {
				this._custom[measure].push({ name, value });
			});
		}
	}

	_markEventStart(startMark) {
		if (!startMark) {
			return;
		}

		const mark = `${startMark}:${performance.now()}`;

		performance.mark(mark);

		return mark;
	}

	_sendEvent(event) {
		return this._client.logUserEvent(event);
	}

}

const telemetry = new WorkToDoTelemetry();

export { telemetry };
