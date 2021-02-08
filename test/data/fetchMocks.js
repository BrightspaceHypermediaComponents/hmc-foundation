import { learningPathExisting, learningPathMissingAction, learningPathNew, learningPathUpdated } from './learningPath.js';
import { courseExisting } from  './course.js';
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

export const mockLink = fetchMock.mock('path:/learning-path/new', () => {
	return GenerateComponentLink('/learning-path/new/object');
})
	.mock('path:/learning-path/new/object', () => {
		return learningPathNew;
	})
	.mock('path:/learning-path/existing', () => {
		return GenerateComponentLink('/learning-path/existing/object');
	})

	.mock('path:/learning-path/existing/object', () => {
		return learningPathExisting;
	})
	.mock('path:/description/update', () => {
		return learningPathUpdated;
	})
	.mock('path:/learning-path/missing-action', () => {
		return GenerateComponentLink('/learning-path/missing-action/object');
	})
	.mock('path:/learning-path/missing-action/object', () => {
		return learningPathMissingAction;
	})
	.mock('path:/course/existing', () => {
		return GenerateComponentLink('/course/existing/object');
	})
	.mock('path:/course/existing/object', () => {
		return courseExisting;
	});
