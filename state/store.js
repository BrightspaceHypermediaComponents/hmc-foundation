import 'd2l-fetch/d2l-fetch.js';
import { getToken, shouldAttachToken } from './token.js';
import { getEntityIdFromSirenEntity } from './sirenComponents/Common.js';
import { HypermediaState } from './HypermediaState.js';
import SirenParse from 'siren-parser';

class StateStore {
	constructor(fetch) {
		this._states = new Map();
		this._fetchStatus = new Map();
		this._d2lfetch = fetch;
	}

	get(entityId, token) {
		const lowerCaseEntityId = entityId.toLowerCase();
		return this._states.has(token.toString()) && this._states.get(token.toString()).has(lowerCaseEntityId) && this._states.get(token.toString()).get(lowerCaseEntityId).keys().next().value;
	}

	makeNewState(entityId, token) {
		const state = this.get(entityId, token) || new HypermediaState(entityId, token);
		const registrations = this._initContainer(this._states, entityId, token, new Map());
		if (!registrations.has(state)) {
			registrations.set(state, { refCount: 0 });
		}

		return state;
	}

	add(state) {
		if (!state || !state.entityId || !state.token.toString) {
			return;
		}

		const registrations = this._initContainer(this._states, state.entityId, state.token, new Map());
		if (!registrations.has(state)) {
			registrations.set(state, { refCount: 0 });
		}
		registrations.get(state).refCount++;
	}

	remove(state) {
		if (!state || !state.entityId || !state.token.toString || !this._states) {
			return;
		}

		const registrations = this._initContainer(this._states, state.entityId, state.token, new Map());
		const refCount = --(registrations.get(state).refCount); // intentional substration.
		if (!refCount || refCount <= 0) {
			registrations.delete(state);
		}

	}

	async fetch(state, bypassCache) {
		// TODO: Add better fetch control. Canceling, pending states and so on.
		if (!state || !state.entityId || !state.token.toString || (state.entity && !bypassCache)) {
			return;
		}

		if (this._fetchStatus.has(state)) {
			return this._fetchStatus.get(state);
		}

		let resolver;
		const promise = new Promise(resolve => resolver = resolve);
		this._fetchStatus.set(state, promise);

		const headers = new Headers();
		!state.token.cookie && headers.set('Authorization', `Bearer ${state.token.value}`);

		const fetch = !state.token.cookie
			? this._d2lfetch
			: this._d2lfetch.removeTemp('auth');

		if (bypassCache) {
			headers.set('pragma', 'no-cache');
			headers.set('cache-control', 'no-cache');
		}

		try {
			const response = await fetch.fetch(state.entityId, { headers });
			if (!response.ok) {
				throw response.status;
			}
			await this._handleCachePriming(state.token, response);
			const json = await response.json();
			const entity = await SirenParse(json);
			this._addFetchedEntities(state.entityId, state.token, entity);

			state.onServerResponse(entity);
		} catch (err) {
			state.onServerResponse(null, err);
		} finally {
			resolver();
			this._fetchStatus.delete(state);
		}
	}

	async performAction(action, input) {
		const href = action.href(input);
		const body = action.body(input);

		const headers = action.header();
		!action.token.cookie && headers.set('Authorization', `Bearer ${action.token.value}`);

		const fetch = !action.token.cookie
			? this._d2lfetch
			: this._d2lfetch.removeTemp('auth');

		try {
			const response = await fetch.fetch(href, { headers, body, method: action.method });
			if (!response.ok) {
				throw response.status;
			}
			await this._handleCachePriming(action.token, response);
			const json = await response.json();
			const entity = await SirenParse(json);
			const state = this.get(entity.getLink('self').href, action.token);

			state.onServerResponse(entity);
		} catch (err) {
			console.error(err);
		}
	}

	_initContainer(map, entityId, token, init) {
		const lowerCaseEntityId = entityId.toLowerCase();
		const tokenCache = token.toString();
		if (!map.has(tokenCache)) {
			map.set(tokenCache, new Map());
		}
		const entityMap = map.get(tokenCache);
		if (init && !entityMap.has(lowerCaseEntityId)) {
			entityMap.set(lowerCaseEntityId, init);
		}
		return entityMap.get(lowerCaseEntityId);
	}

	_handleCachePriming(token, response) {
		const linkHeaderValues = response.headers && response.headers.get('Link');
		if (!linkHeaderValues) {
			return;
		}

		const cachePrimers = this._parseLinkHeader(linkHeaderValues)
			.filter((link) => {
				return link.rel.indexOf('https://api.brightspace.com/rels/cache-primer') !== -1;
			});

		if (cachePrimers.length === 0) {
			return;
		}

		return Promise.all(cachePrimers.map((cachePrimer) => {
			const state = this.makeNewState(cachePrimer.href, token);
			return this.fetch(state, true);
		}));
	}

	// parse a Link header
	//
	// Link:<https://example.org/.meta>; rel=meta
	//
	// var r = parseLinkHeader(xhr.getResponseHeader('Link');
	// r['meta'] outputs https://example.org/.meta
	//
	_parseLinkHeader(links) {
		const linkexp = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g; // eslint-disable-line no-useless-escape
		const paramexp = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g; // eslint-disable-line no-useless-escape

		const matches = links.match(linkexp);
		const _links = [];
		for (let i = 0; i < matches.length; i++) {
			const split = matches[i].split('>');
			const href = split[0].substring(1);
			_links.push({
				href
			});
			const ps = split[1];
			const s = ps.match(paramexp);
			for (let j = 0; j < s.length; j++) {
				const p = s[j];
				const paramsplit = p.split('=');
				const name = paramsplit[0];
				const val = paramsplit[1].replace(/["']/g, '');
				if (name === 'rel') {
					const relsplit = val.split(' ');
					_links[i][name] = relsplit;
				} else {
					_links[i][name] = val;
				}
			}
		}
		return _links;
	}

	_addFetchedEntities(href, token, entity) {
		const entityIndex = new Set();
		const expandEntities = [];
		entityIndex.add(href.toLowerCase());
		expandEntities.push(entity);

		while (expandEntities.length > 0) {
			const expandEntity = expandEntities.shift();
			(expandEntity.entities || []).forEach(entity => {
				expandEntities.push(entity);
			});

			if (!expandEntity.href && expandEntity.hasLinkByRel('self')) {
				const href = expandEntity.getLinkByRel('self').href.toLowerCase();
				if (!entityIndex.has(href)) {
					const state = this.makeNewState(href, token);
					state.onServerResponse(expandEntity);
					entityIndex.add(href);
				}
			}
		}
	}
}

window.D2L = window.D2L || {};
window.D2L.SirenSdk = window.D2L.SirenSdk || {};
window.D2L.SirenSdk.StateStore = window.D2L.SirenSdk.StateStore || new StateStore(window.d2lfetch);

export async function refreshState(state, refetch = true) {
	await state.refreshToken();
	return window.D2L.SirenSdk.StateStore.fetch(state, refetch);
}

export function stateFactoryByRawSirenEntity(rawEntity, token) {
	const entityId = getEntityIdFromSirenEntity(rawEntity);
	if (!entityId) {
		const state = new HypermediaState(entityId, token);
		state.onServerResponse(rawEntity);
		return state;
	}

	return stateFactory(entityId, shouldAttachToken(token, rawEntity));
}

export async function stateFactory(entityId, token) {
	if (!entityId) return;
	const tokenResolved = await getToken(token);
	const state = window.D2L.SirenSdk.StateStore.makeNewState(entityId, tokenResolved);
	window.D2L.SirenSdk.StateStore.add(state);
	return state;
}

export async function fetch(state) {
	if (!state || state.hasServerResponseCached()) {
		return true;
	}

	await state.refreshToken();
	return window.D2L.SirenSdk.StateStore.fetch(state);
}

export async function performAction(action, input) {
	await action.refreshToken();
	return window.D2L.SirenSdk.StateStore.performAction(action, input);
}

export async function dispose(state, component) {
	state && state.dispose(component);
}
