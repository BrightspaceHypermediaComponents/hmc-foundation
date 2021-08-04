import Events from 'd2l-telemetry-browser-client';

const base = Object.freeze({
	appId: 'worktodo',
	api: 'd2l-work-to-do.api',
	activitiesNextpage: 'https://activities.api.brightspace.com/rels/next-page'
});

const marks = Object.freeze({
	overdue: {
		loaded: `${base.api}.overdue.loaded`,
		started: `${base.api}.overdue.started`
	},
	upcoming: {
		loaded: `${base.api}.upcoming.loaded`,
		started: `${base.api}.upcoming.started`
	},
	view: {
		loaded: `${base.api}.view.loaded`
	}
});

const measures = Object.freeze({
	viewLoad: [marks.overdue.loaded, marks.upcoming.loaded, marks.view.loaded],
	loadMore: [marks.overdue.loaded, marks.upcoming.loaded]
});

class WorkToDoTelemetry {

	constructor() {
		this._custom = {};
		this._marks = {};
		this._createClient();
	}

	logActivityNavigatedTo(href, type) {
		return this._logTelemetryEvent('NavigatedTo', href, type).catch(() => {});
	}

	logViewAllClicked(href) {
		return this._logTelemetryEvent('ViewAllClicked', href, 'ViewAll').catch(() => {});
	}

	markAndLogLoadMore() {
		this._logPerformanceEvent('LoadMore', base.activitiesNextpage, 'ActivitiesNextPage',  measures.loadMore);
	}

	markAndLogWidgetLoaded(fullscreen) {
		this._markEventEnd(marks.view.loaded, null);
		this._logPerformanceEvent('LoadView', window.location.pathname, fullscreen ? 'Fullscreen' : 'Widget', measures.viewLoad);
	}

	markFetchEnd(name, count = 0) {
		const data = { [`${name.charAt(0).toUpperCase()}${name.slice(1)}Count`]: count };
		this._markEventEnd(marks[name].loaded, this._marks[name], data);
	}

	markFetchStart(name) {
		this._marks[name] = this._markEventStart(marks[name].started);
	}

	async _createClient() {
		if (window.D2L.Telemetry) {
			this._client = await window.D2L.Telemetry.CreateClient();
		}
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
			.setSourceId(base.appId)
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
			.setSourceId(base.appId)
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
		return this._client && this._client.logUserEvent(event);
	}

}

const telemetry = new WorkToDoTelemetry();

export { telemetry };
