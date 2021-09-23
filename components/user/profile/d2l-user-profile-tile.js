import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui-labs/user-profile-card/user-profile-card.js';
import { css,  LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	userProfile: 'https://api.brightspace.com/rels/user-profile',
	profileImage: 'https://api.brightspace.com/rels/profile-image',
	thumbnailMedium: 'https://api.brightspace.com/rels/thumbnail#regular',
	alternate: 'alternate',
	displayName: 'https://api.brightspace.com/rels/display-name'
});
// todo: add the color tiles
class UserProfileTile extends SkeletonMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			_userProfileImageUrl: { type: String, observable: observableTypes.subEntity, rel: rels.profileImage, verbose: true, route: [
				{ observable: observableTypes.subEntity, rel: rels.userProfile }
			], method: (entity) => {
				const raw = entity.rawSirenParsedEntity;
				if (raw.hasClass('default-image')) {
					this._defaultImage = true;
					return raw.getLinkByRel(rels.thumbnailMedium).href;
				}

				return raw.getLinkByRel(rels.alternate).href;
			}},
			_enrolled: { type: Boolean, observable: observableTypes.classes, method: (classes) => classes.includes('enrolled') },
			_userProfilePath: { type: String, observable: observableTypes.property, name: 'path', route: [
				{ observable: observableTypes.subEntity, rel: rels.userProfile }
			] },
			_displayName: { type: String, observable: observableTypes.property, name: 'name', route: [
				{ observable: observableTypes.subEntity, rel: rels.displayName }
			] },
			tileSize: { type: String, attribute: 'tile-size' }
		};
	}

	static get styles() {
		return [super.styles, css`
			:host {
				display: inline-block;
				line-height: 0;
			}
			:host([tile-size="small"]) .d2l-profile-img {
				height: 1.5rem;
				width: 1.5rem;
			}
			:host([tile-size="medium"]) .d2l-profile-img {
				height: 2.1rem;
				width: 2.1rem;
			}
			:host([tile-size="large"]) .d2l-profile-img {
				height: 3rem;
				width: 3rem;
			}
			:host([tile-size="x-large"]) .d2l-profile-img {
				height: 4.2rem;
				width: 4.2rem;
			}
			:host([tile-size="small"]) .d2l-profile-img,
			:host([tile-size="small"]) a {
				border-radius: 0.2rem;
			}
			:host([tile-size="medium"]) .d2l-profile-img,
			:host([tile-size="medium"]) a {
				border-radius: 0.3rem;
			}
			:host([tile-size="large"]) .d2l-profile-img,
			:host([tile-size="large"]) a {
				border-radius: 0.4rem;
			}
			:host([tile-size="x-large"]) .d2l-profile-img,
			:host([tile-size="x-large"]) a {
				border-radius: 0.5rem;
			}
			img {
				object-fit: contain;
				width: 100%;
			}
			a.d2l-link {
				display: inline-block;
				box-sizing: border-box;
				width: 100%;
				padding: 0.3rem;
				border: 1px solid transparent;
			}
			a:hover {
				border-color: var(--d2l-color-corundum);
			}
		`];
	}
	constructor() {
		super();
		this.displayType = 'avatar';
		this.skeleton = true;
		this.tileSize = 'small';
	}

	render() {
		if (this.skeleton || !this._image) {
			return html`
				<div class="d2l-skeletize">placeholder</div>
			`;
		}
		// todo: localization
		const label = !this._enrolled ? `View ${this._displayName}'s profile` : '';
		const profileImage = this._enrolled ?
			html`<d2l-labs-user-profile-card
				tagline="I am a tagline!"
				website="www.mayaSuperWebsite.com"
				token="${this.token}"
				href="${this.href}">
				<div slot="social-media-icons">
					<d2l-icon icon="tier2:save"></d2l-icon>
					<d2l-icon icon="tier2:browser"></d2l-icon>
					<d2l-icon icon="tier2:send"></d2l-icon>
				</div>
			</d2l-labs-user-profile-card>` :
			html`<img src="${this._image.src}" alt="${label}" class="d2l-profile-img">`;
		return !this._enrolled ? html`<a href="${this._userProfilePath}" class="d2l-link">
			${profileImage}
		</a>` : html`${profileImage}`;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		if (loaded && !this._image) {
			this._loadImage();
		} else {
			this.skeleton = !loaded || !this._image || !this._image.loaded;
		}
	}

	_loadImage() {
		this._image = new Image();
		this._image.loaded = false;
		this._image.onload = () => {
			this._image.loaded = true;
			this._loaded = true;
		};

		this._image.src = this._userProfileImageUrl;
	}
}

customHypermediaElement('d2l-user-profile-tile', UserProfileTile);
