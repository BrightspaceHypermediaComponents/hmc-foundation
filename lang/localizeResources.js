export async function getLocalizeResources(langs, directory) {
	const dir = `../${directory}/lang/`;
	let translations;

	for await (const lang of langs) {
		switch (lang) {
			case 'ar':
				translations = await import(`${dir}ar.js`);
				break;
			case 'cy':
				translations = await import(`${dir}cy.js`);
				break;
			case 'da':
				translations = await import(`${dir}da.js`);
				break;
			case 'de':
				translations = await import(`${dir}de.js`);
				break;
			case 'en':
				translations = await import(`${dir}en.js`);
				break;
			case 'es-es':
				translations = await import(`${dir}es-es.js`);
				break;
			case 'es':
				translations = await import(`${dir}es.js`);
				break;
			case 'fr-fr':
				translations = await import(`${dir}fr-fr.js`);
				break;
			case 'fr':
				translations = await import(`${dir}fr.js`);
				break;
			case 'ja':
				translations = await import(`${dir}ja.js`);
				break;
			case 'ko':
				translations = await import(`${dir}ko.js`);
				break;
			case 'nl':
				translations = await import(`${dir}nl.js`);
				break;
			case 'pt':
				translations = await import(`${dir}pt.js`);
				break;
			case 'sv':
				translations = await import(`${dir}sv.js`);
				break;
			case 'tr':
				translations = await import(`${dir}tr.js`);
				break;
			case 'zh-tw':
				translations = await import(`${dir}zh-tw.js`);
				break;
			case 'zh':
				translations = await import(`${dir}zh.js`);
				break;
		}
		if (translations && translations.default) {
			return {
				language: lang,
				resources: translations.default
			};
		}
	}

	translations = await import(`${dir}en.js`);
	return {
		language: 'en',
		resources: translations.default
	};
}
