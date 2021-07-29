export const workToDoMain = {
	class: ['user'],
	entities: [
		{
			class: ['display', 'name'],
			rel: ['https://api.brightspace.com/rels/display-name'],
			properties: { name: 'Eddie Albert' },
		},
	],
	links: [
		{
			rel: [
				'https://activities.api.brightspace.com/rels/my-activities#empty',
			],
			href: '/w2d-activities',
		},
		{
			rel: ['self'],
			href: '/w2d',
		},
		{
			rel: ['https://api.brightspace.com/rels/root'],
			href: '/w2d-root',
		},
	],
};

export const workToDoActivities = {
	class: ['collection', 'empty'],
	properties: {},
	links: [
		{
			rel: ['self'],
			href: '/w2d-activities',
		},
		{
			rel: ['https://activities.api.brightspace.com/rels/overdue'],
			href: '/w2d-activities/overdue',
		},
	],
	actions: [
		{
			href: '/w2d-activities',
			name: 'select-custom-date-range',
			method: 'GET',
			fields: [
				{
					type: 'text',
					name: 'start',
					value: '2021-06-28T19:50:20.287Z',
				},
				{
					type: 'text',
					name: 'end',
					value: '2021-07-05T19:50:20.287Z',
				},
				{ type: 'number', name: 'page' },
				{ type: 'number', name: 'pageSize' },
				{ class: ['base64', 'json'], type: 'text', name: 'filter' },
			],
		},
		{
			href: '/w2d-activities',
			name: 'filter-work-to-do',
			method: 'GET',
			fields: [
				{
					type: 'text',
					name: 'start',
					value: '2021-06-28T19:50:20.287Z',
				},
				{
					type: 'text',
					name: 'end',
					value: '2021-07-05T19:50:20.287Z',
				},
				{ type: 'number', name: 'page' },
				{ type: 'number', name: 'pageSize' },
				{ type: 'checkbox', name: 'embed', value: false },
				{
					class: ['base64', 'json'],
					type: 'text',
					name: 'filter',
					value: 'eyJjOTgxNDI3ZS1jNzIwLTQzYmEtOWVkYS0zMjcyNWExMDEyY2YiOlsiMSJdLCJkNTYxNDdhNi00MGYxLTRlN2UtYmRiNi00NWIyMmVmNTI5ODAiOlsiMjAwMCIsIjYxMDAwIiwiMzcwMDAiLCI3MDYwMDAiLCIzMDAwIiwiNTEwMDAiLCIzMjAwMCJdLCJjYTgxZmI5Yi1lY2ViLTRlNjktYjNkNy1mZDhjYzk4ZjllZTkiOlsiMCJdfQ',
				},
			],
		},
		{
			href: '/w2d-activities/overdue',
			name: 'filter-overdue-activities',
			method: 'GET',
			fields: [
				{ type: 'checkbox', name: 'embed', value: false },
				{
					type: 'text',
					name: 'filter',
					value: 'eyJjODUzYWY5OS0yNWEyLTQwNmEtYmQ2Yy1hMWU5YTI2NTQ4M2MiOlsiMjAyMS0wNC0wNVQxOTo1MDoyMC4yODdaIiwiMjAyMS0wNi0yOFQxOTo1MDoyMC4yODdaIl19',
				},
			],
		},
	],
};

export const workToDoOverdue = {
	class: ['collection'],
	properties: { pageSize: 20, currentPage: 1, pagingTotalResults: 7 },
	entities: [
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity-5',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity-6',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity-7',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity-8',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity-9',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity-10',
		},
	],
	links: [
		{
			rel: ['self'],
			href: '/w2d-activities/overdue?filter=eyJjODUzYWY5OS0yNWEyLTQwNmEtYmQ2Yy1hMWU5YTI2NTQ4M2MiOlsiMjAyMS0wNC0wNVQxOTo1MDoyMC4yODdaIiwiMjAyMS0wNi0yOFQxOTo1MDoyMC4yODdaIl19&page=1&pageSize=20',
		},
	],
};

export const workToDoOverdueLess = {
	class: ['collection'],
	properties: { pageSize: 20, currentPage: 1, pagingTotalResults: 6 },
	entities: [
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity-5',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity-6',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity-7',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity-8',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
			],
			href: '/w2d-activity-9',
		}
	],
	links: [
		{
			rel: ['self'],
			href: '/w2d-activities/overdue?filter=eyJjODUzYWY5OS0yNWEyLTQwNmEtYmQ2Yy1hMWU5YTI2NTQ4M2MiOlsiMjAyMS0wNC0wNVQxOTo1MDoyMC4yODdaIiwiMjAyMS0wNi0yOFQxOTo1MDoyMC4yODdaIl19&page=1&pageSize=20',
		},
	],
};

export const workToDoRoot = {
	class: ['root'],
	links: [
		{
			rel: ['https://api.brightspace.com/rels/organization'],
			href: '/w2d-orgs',
		},
	],
};

export const workToDoOrgs = {
	class: [
		'named-entity',
		'describable-entity',
		'draft-published-entity',
		'published',
		'active',
		'organization',
	],
	properties: {
		name: 'Dev',
		code: null,
		startDate: null,
		endDate: null,
		isActive: true,
		description: '',
	},
	entities: [],
	links: [],
};

export const workToDoActivity = {
	class: ['user-assignment-activity', 'activity'],
	entities: [
		{
			class: ['assignment-submission-list'],
			rel: [
				'https://assignments.api.brightspace.com/rels/assignment-submission-list',
			],
			properties: {},
		},
		{
			class: ['due-date', 'date'],
			rel: ['https://api.brightspace.com/rels/date'],
			properties: {
				date: '2021-06-25T03:59:59.000Z',
				localizedDate: '2021-06-24T23:59:59.000',
			},
		},
		{
			class: ['completion', 'incomplete'],
			rel: [
				'item',
				'https://activities.api.brightspace.com/rels/completion',
			],
		},
	],
	links: [
		{
			rel: [
				'https://activities.api.brightspace.com/rels/user-activity-usage',
				'self',
			],
			href: '/w2d-activity-4',
		},
	],
	actions: [],
};

export const workToDoFolder = {
	class: ['named-entity', 'assignment'],
	properties: {
		name: 'Untitled',
		dueDate: '2021-06-25T03:59:59.000Z',
		outOf: 0.0,
		addToGrades: false,
		draft: false,
		submissionType: { title: 'File submission', value: 0 },
		defaultScoringRubricId: null,
	},
	entities: [],
	links: [
		{
			rel: ['self'],
			href: '/w2d-folder4',
		},
	],
};
