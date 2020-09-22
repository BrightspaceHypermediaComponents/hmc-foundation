//todo: functionality great messy as hell
let gettingToken = null;

export async function getToken(token) {
	if (typeof (token) !== 'function') {
		return new Token(token, token);
	}
	if (gettingToken) {
		return gettingToken;
	}
	let resolver;
	gettingToken = new Promise(resolve => resolver = resolve);

	const tokenValue = await token();
	const resolvedToken = new Token(tokenValue, token);
	resolver(resolvedToken);
	gettingToken = null;
	return resolvedToken;
}

export async function refreshToken(token) {
	return getToken(token.rawToken);
}

export function compareTokens(a, b) {
	return a.toString() === b.toString();
}

export function shouldAttachToken(token, sirenLink) {
	const rel = sirenLink && sirenLink.rel;
	if (!Array.isArray(rel)) {
		return TOKEN_COOKIE;
	}

	const isNoFollow = -1 !== rel.indexOf('nofollow');

	return isNoFollow ? TOKEN_COOKIE : token.rawToken;
}

export const TOKEN_COOKIE = -1;
export const TOKEN_COOKIE_CACHE_KEY = 'cookie';

class Token {
	constructor(token, rawToken) {
		this._cacheKey = this._parseCacheKey(token);
		this._value = token;
		this._rawToken = rawToken;
	}

	get rawToken() {
		return this._rawToken;
	}

	get value() {
		return this._value;
	}

	get cookie() {
		return this._value === TOKEN_COOKIE;
	}

	toString() {
		return this._cacheKey;
	}

	isResolved() {
		return !!this.value;
	}

	/**
	 * From the static data from the JWT create a static key.
	 * @param {*} token
	 */
	_parseCacheKey(token) {
		if (!token) {
			return '';
		}
		if (token === TOKEN_COOKIE) {
			return TOKEN_COOKIE_CACHE_KEY;
		}

		const tokenParts = token.split('.');

		if (tokenParts.length < 3) {
			return token;
		}

		const decoded = JSON.parse(atob(tokenParts[1]).toString());

		const volatileClaims = ['exp', 'iat', 'jti', 'nbf'];
		const normalizedClaims = Object.keys(decoded)
			.filter((val) => volatileClaims.indexOf(val) === -1)
			.reduce((result, key) => {
				result[key] = decoded[key];
				return result;
			}, {});

		const cacheKey = btoa(JSON.stringify(normalizedClaims));
		return cacheKey.toLowerCase();
	}
}
