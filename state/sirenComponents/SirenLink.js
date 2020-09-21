import { fetch, stateFactory } from '../../state/store.js';
import { Component } from './Common.js';
import { shouldAttachToken } from '../token.js';

export class SirenLink {
	constructor({id, token}) {
		this._rel = id;
		this._components = new Component();
		this._routes = new Map();
		this._token = token;
	}

	get link() {
		return this._link;
	}

	set link(link) {
		if (!this._link !== link) {
			this._components.setProperty(link && link.href);
		}
		this._link = link;

	}

	get childState() {
		return this._childState;
	}

	get rel() {
		return this._rel;
	}

	addComponent(component, property, {route, method}) {
		if (route) {
			const currentRoute = this._routes.has(component) ? this._routes.get(component) : {};
			this._routes.set(component, {...currentRoute, ...route});
			return;
		}
		this._components.add(component, property, method);
		this._components.setComponentProperty(component, this.link && this.link.href);
	}

	deleteComponent(component) {
		if (this._route.has(component)) {
			this._childState.dispose(component);
			this._route.delete(component);
			return;
		}
		this._components.delete(component);
	}

	async setSirenEntity(sirenEntity, linkCollectionMap) {
		this.link = sirenEntity && sirenEntity.hasLinkByRel(this.rel) && sirenEntity.getLinkByRel(this.rel);
		if (!this.link) return;

		if (linkCollectionMap && linkCollectionMap instanceof Map) {
			this.link.rel.forEach(rel => {
				if (linkCollectionMap.has(rel) && this !== linkCollectionMap.get(rel)) {
					this._merge(linkCollectionMap.get(rel));
				}
				linkCollectionMap.set(rel, this);
			});
		}

		if (this._token) {
			this._childState = await stateFactory(this.link.href, shouldAttachToken(this._token, this.link));
			this._routes.forEach((route, component) => {
				this._childState.addObservables(component, route);
			});
			fetch(this._childState);
		}
	}

	_merge(sirenLink) {
		if (!sirenLink || !(sirenLink instanceof SirenLink)) {
			return;
		}

		sirenLink._components.components.forEach((component, property) => {
			this.addComponent(component, property);
		});

		this._token = this._token || sirenLink._token;
	}
}
