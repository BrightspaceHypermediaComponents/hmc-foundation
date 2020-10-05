import { Component } from './Common.js';
import { performAction } from '../../state/store.js';
import { refreshToken } from '../token.js';

export class SirenAction {
	static basicInfo({name: id, token, state}) {
		return { id, token, state };
	}

	constructor({id: name, token, state}) {
		this._components = new Component();
		this._action = { has: false, commit: () => undefined };
		this._name = name;
		this._token = token;
		this._state = state;
	}

	get action() {
		return this._action;
	}

	set action({has, commit}) {
		if (!has || typeof commit !== 'function') {
			commit = () => undefined;
		}
		if (this._action.has !== has || this._action.commit !== commit) {
			this._components.setProperty({has, commit});
		}

		this._action = {has, commit};

	}

	get method() {
		return this._rawSirenAction && this._rawSirenAction.method;
	}

	get token() {
		return this._token;
	}

	addComponent(component, property, {method}) {
		this._components.add(component, property, method);
		this._components.setComponentProperty(component, this.action);
	}

	body(input) {
		if (this._rawSirenAction.type.indexOf('json') !== -1) {
			return JSON.stringify({...this._fields, ...input});
		} else if (this._rawSirenAction.method !== 'GET' && this._rawSirenAction.method !== 'HEAD') {
			const formData = new FormData();
			const fields = {...this._fields, ...input};
			Object.keys(fields).forEach((name) => formData.append(name, fields[name]));
			return formData;
		}
	}

	deleteComponent(component) {
		this._components.delete(component);
	}

	header() {
		const headers = new Headers();
		if (this._rawSirenAction.type.indexOf('json') !== -1) {
			headers.set('Content-Type', this._rawSirenAction.type);
		}

		return headers;
	}

	href(input) {
		let url = new URL(this._rawSirenAction.href, window.location.origin);
		if (this._rawSirenAction.method === 'GET' || this._rawSirenAction.method === 'HEAD') {
			const fields = {...this._fields, ...input};
			const params = new URLSearchParams(Object.keys(fields).map((name) => [name, fields[name]]));
			url = new URL(`${url.pathname}?${params.toString()}`, url.origin);
		}

		return url.toString();
	}

	push() {
		if (typeof this._params !== 'object') return;
		const params = {};
		Object.keys(this._params).forEach(field => params[field] = this._params[field]?.value ? this._params[field].value : this._params[field]);
		performAction(this, params);
	}

	refreshToken() {
		return refreshToken(this.token);
	}

	setSirenEntity(sirenEntity) {
		if (!sirenEntity || !sirenEntity.hasActionByName(this._name)) {
			this.action = { has: false };
			return;
		}

		this._rawSirenAction = sirenEntity.getActionByName(this._name);
		this._fields = this._decodeFields(this._rawSirenAction);

		this.action = {
			has: true,
			commit: (observables) => {
				this._params = observables || {};
				return this._state.updateProperties(observables);
			}
		};
	}

	reset() {
		this._params = undefined;
	}

	// Doesn't support field names with the same name.
	_decodeFields(action) {
		const url = new URL(action.href, window.location.origin);
		const fields = {};
		if (action.method === 'GET' || action.method === 'HEAD') {
			for (const param in url.searchParams.entries()) {
				fields[param[0]] = param[1];
			}
		}

		if (action.fields && action.fields.forEach) {
			action.fields.forEach((field) => {
				if (field.value === undefined) {
					return;
				}

				fields[field.name] = field.value;
			});
		}
		return fields;
	}
}
