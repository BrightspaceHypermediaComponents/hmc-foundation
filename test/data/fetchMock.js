
import { assert } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';

/*
	HMC engine makes a call to the Component link and then fetches the href to get the object.
	Method handles this interaction by supplying the desired endpoint.
	(ex. comp with href="/learning-path/new" creates a link to /learning-path/new/object)
*/
function GenerateComponentLink(linkPath) {
	return {
		links:[
			{
				href: linkPath,
				rel: ['https://api.brightspace.com/rels/organization', 'https://api.brightspace.com/rels/specialization']
			}
		]
	};
}

export const mockLink = fetchMock;

export async function addToMock(path, object, createComponent, testObject = true) {
	mockLink.mock(`path:${path}`, () => {return GenerateComponentLink(`${path}/object`);});
	if (object) {
		mockLink.mock(`path:${path}/object`, () => object);
	}

	await createComponent(path);
	assert.isTrue(mockLink.called(`path:${path}`), `${path} was not called`);
	if (object && testObject) assert.isTrue(mockLink.called(`path:${path}/object`), `${path}/object was not called`);
}
