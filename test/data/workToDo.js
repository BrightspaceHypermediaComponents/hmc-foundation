// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.users.api.proddev.d2l/10183 => /w2d
export const workToDoMain = {
	class: ['user'],
	entities: [
		{
			class: ['display', 'name'],
			rel: ['https://api.brightspace.com/rels/display-name'],
			properties: { name: 'Eddie Albert' },
		},
		{
			class: ['first', 'name'],
			rel: ['https://api.brightspace.com/rels/first-name'],
			properties: { name: 'Eddie' },
		},
		{
			class: ['last', 'name'],
			rel: ['https://api.brightspace.com/rels/last-name'],
			properties: { name: 'Albert' },
		},
		{
			class: ['orgDefinedId'],
			rel: ['https://api.brightspace.com/rels/org-defined-id'],
			properties: { orgDefinedId: 'EAlbert' },
		},
		{
			class: ['profile'],
			rel: ['https://api.brightspace.com/rels/user-profile'],
			properties: { isOnline: false },
			entities: [
				{
					class: ['file', 'image', 'default-image'],
					rel: ['https://api.brightspace.com/rels/profile-image'],
					properties: {},
					links: [
						{
							rel: ['alternate'],
							href: 'http://d2l-annbrgvfg3d.desire2learn.d2l:44446/d2l/img/0/Framework.UserProfileBadge.actProfileDaylight200.png?v=20.21.7.0-5416366',
						},
						{
							rel: [
								'preview',
								'https://api.brightspace.com/rels/thumbnail#small',
							],
							href: 'http://d2l-annbrgvfg3d.desire2learn.d2l:44446/d2l/img/0/Framework.UserProfileBadge.actProfileDaylight22.png?v=20.21.7.0-5416366',
						},
						{
							rel: [
								'preview',
								'https://api.brightspace.com/rels/thumbnail#regular',
							],
							href: 'http://d2l-annbrgvfg3d.desire2learn.d2l:44446/d2l/img/0/Framework.UserProfileBadge.actProfileDaylight50.png?v=20.21.7.0-5416366',
						},
					],
				},
			],
		},
	],
	links: [
		{
			rel: ['https://api.brightspace.com/rels/my-organization-awards'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.awards.api.proddev.d2l/organizations/6606/users/10183?allOrgUnits=1',
		},
		{
			rel: ['https://activities.api.brightspace.com/rels/my-activities'],
			href: '/w2d-activities/?start=2021-06-28T19%3a50%3a20.032Z&end=2021-07-05T19%3a50%3a20.032Z',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/my-activities#empty',
			],
			href: '/w2d-activities',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/my-unassessed-activities',
			],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/my-unassessed-activities',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/my-unassessed-activity-collections',
			],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/my-unassessed-activities/collections',
		},
		{
			rel: [
				'https://discussions.api.brightspace.com/rels/my-subscriptions',
			],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.discussions.api.proddev.d2l/subscriptions/threads/users/10183',
		},
		{
			rel: ['self'],
			href: '/w2d',
		},
		{
			rel: ['https://api.brightspace.com/rels/root'],
			href: '/w2d-root',
		},
		{
			rel: ['https://api.brightspace.com/rels/my-enrollments'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.enrollments.api.proddev.d2l/users/10183',
		},
		{
			rel: [
				'https://notifications.api.brightspace.com/rels/my-notifications',
			],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.notifications.api.proddev.d2l/',
		},
	],
};

// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/users/10183 => /w2d-activities
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

// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/users/10183/overdue => /w2d-activities/overdue
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
		{
			rel: ['up'],
			href: '/w2d-activities?start=2021-06-28T19%3a50%3a21.001Z&end=2021-07-05T19%3a50%3a21.001Z',
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
		{
			rel: ['up'],
			href: '/w2d-activities?start=2021-06-28T19%3a50%3a21.001Z&end=2021-07-05T19%3a50%3a21.001Z',
		},
	],
};

// http://d2l-annbrgvfg3d.desire2learn.d2l:44446/d2l/api/hm => /w2d-root
export const workToDoRoot = {
	class: ['root'],
	links: [
		{
			rel: ['https://api.brightspace.com/rels/enrollments'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.enrollments.api.proddev.d2l/',
		},
		{
			rel: ['https://api.brightspace.com/rels/whoami'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.users.api.proddev.d2l/169',
		},
		{
			rel: ['self'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.api.proddev.d2l/',
		},
		{
			rel: ['https://api.brightspace.com/rels/organizations'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.organizations.api.proddev.d2l/',
		},
		{
			rel: ['https://api.brightspace.com/rels/organization'],
			href: '/w2d-orgs',
		},
		{
			rel: ['https://api.brightspace.com/rels/feedback'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.feedback.api.proddev.d2l/',
		},
	],
};

// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.organizations.api.proddev.d2l/6606 => /w2d-orgs
// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.organizations.api.proddev.d2l/6609 => /w2d-orgs-2
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
	entities: [
		{
			class: ['richtext', 'description'],
			rel: ['item'],
			properties: { text: '', html: null },
		},
		{
			class: ['color'],
			rel: ['https://api.brightspace.com/rels/color'],
			properties: { hexString: '#8ad934', description: '' },
		},
		{
			class: ['course-image'],
			rel: [
				'https://api.brightspace.com/rels/organization-image',
				'nofollow',
			],
			href: 'https://s.brightspace.com/course-images/images/a30cd7c0-06e6-4027-826e-346bed66241c',
		},
		{
			class: ['relative-uri'],
			rel: [
				'item',
				'https://api.brightspace.com/rels/organization-homepage',
			],
			properties: { path: '/d2l/home' },
		},
	],
	links: [
		{
			rel: ['https://api.brightspace.com/rels/my-organization-awards'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.awards.api.proddev.d2l/organizations/6606/users/10183',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/organization-activities',
			],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activityusages/6606',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/my-organization-activities',
			],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activityusages/6606/users/10183?start=2021-06-29T16%3a07%3a44.044Z&end=2021-07-06T16%3a07%3a44.044Z',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/my-organization-activities#empty',
			],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activityusages/6606/users/10183',
		},
		{
			rel: ['https://checklists.api.brightspace.com/rels/checklists'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.checklists.api.proddev.d2l/organizations/6606',
		},
		{
			rel: ['https://activities.api.brightspace.com/rels/activity-usage'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activities/6606_706000_6606/usages/6606',
		},
		{
			rel: ['https://files.api.brightspace.com/rels/files'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.files.api.proddev.d2l/6606',
		},
		{
			rel: ['https://api.brightspace.com/rels/discussions'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.discussions.api.proddev.d2l/6606',
		},
		{
			rel: ['https://assignments.api.brightspace.com/rels/assignments'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.assignments.api.proddev.d2l/6606',
		},
		{
			rel: ['https://outcomes.api.brightspace.com/rels/intents'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.outcomes.api.proddev.d2l/intents/faaa3ce2-6dbc-4f53-90b2-a0ef17b271f3',
		},
		{
			rel: [
				'https://announcements.api.brightspace.com/rels/organization-announcements',
			],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.announcements.api.proddev.d2l/organizations/6606',
		},
		{
			rel: [
				'https://notifications.api.brightspace.com/rels/organization-notifications',
			],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.notifications.api.proddev.d2l/my-notifications/organizations/6606',
		},
		{
			rel: ['https://api.brightspace.com/rels/organization-homepage'],
			type: 'text/html',
			href: 'http://d2l-annbrgvfg3d.desire2learn.d2l:44446/d2l/home',
		},
		{
			rel: ['self'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.organizations.api.proddev.d2l/6606',
		},
		{
			rel: [
				'https://enrollments.api.brightspace.com/rels/primary-facilitators',
			],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.enrollments.api.proddev.d2l/organizations/6606?filter=eyJkN2E5ZTM5Ny1lMDFiLTRjZjctODIxZS1mYWU3M2Q2MjgzMDUiOlsicHJpbWFyeUluc3RydWN0b3IiXX0',
		},
		{
			rel: ['https://api.brightspace.com/rels/notification-alerts'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.alerts.api.proddev.d2l/notification-alerts',
		},
		{
			rel: ['https://notifications.api.brightspace.com/rels/my-alerts'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.notifications.api.proddev.d2l/alerts/6606',
		},
		{
			class: ['active', 'theme'],
			rel: ['https://themes.api.brightspace.com/rels/theme'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.themes.api.proddev.d2l/6606/3',
		},
	],
};

// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activities/6606_2000_4/usages/6609/users/10183 => /w2d-activity
// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activities/6606_2000_4/usages/6609/users/10183 => /w2d-activity-4
// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activities/6606_2000_5/usages/6609/users/10183 => /w2d-activity-5
// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activities/6606_2000_6/usages/6609/users/10183 => /w2d-activity-6
// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activities/6606_2000_7/usages/6609/users/10183 => /w2d-activity-7
// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activities/6606_2000_8/usages/6609/users/10183 => /w2d-activity-8
// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activities/6606_2000_9/usages/6609/users/10183 => /w2d-activity-9
// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activities/6606_2000_10/usages/6609/users/10183 => /w2d-activity-10
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
		{
			rel: ['https://activities.api.brightspace.com/rels/activity-usage'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activities/6606_2000_4/usages/6609',
		},
		{
			rel: ['https://api.brightspace.com/rels/user'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.users.api.proddev.d2l/10183',
		},
		{
			rel: ['https://api.brightspace.com/rels/organization'],
			href: '/w2d-orgs-2',
		},
		{
			rel: ['https://activities.api.brightspace.com/rels/evaluation'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activities/6606_2000_4/usages/6609/users/user_10183/evaluation',
		},
		{
			rel: ['https://activities.api.brightspace.com/rels/associations'],
			href: '/w2d-activity-4/associations',
		},
		{
			rel: ['https://api.brightspace.com/rels/assignment'],
			href: '/w2d-folder4',
		},
		{
			rel: ['https://alignments.api.brightspace.com/rels/alignments'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.alignments.api.proddev.d2l/user-activity-usage/6606_2000_4/6609/10183',
		},
	],
	actions: [
		{
			href: '/w2d-activity-4/associations',
			name: 'query-associations',
			method: 'GET',
			fields: [{ type: 'text', name: 'type' }],
		},
		{
			class: ['my-assignment', 'submit'],
			type: 'multipart/mixed',
			title: 'Submit to an assignment folder',
			href: '/w2d-folder4/submissions/my-submission',
			name: 'submit',
			method: 'POST',
		},
	],
};

// https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.assignments.api.proddev.d2l/6609/folders/4 => /w2d-folder
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
	entities: [
		{
			class: ['date', 'due-date'],
			rel: ['https://api.brightspace.com/rels/date'],
			properties: { date: '2021-06-25T03:59:59.000Z' },
		},
		{
			class: ['attachments', 'collection'],
			rel: ['https://assignments.api.brightspace.com/rels/attachments'],
			links: [
				{
					rel: ['self'],
					href: '/w2d-folder4/attachments',
				},
				{
					rel: ['https://files.api.brightspace.com/rels/files'],
					href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.files.api.proddev.d2l/6609',
				},
			],
		},
		{
			class: ['annotations', 'enabled'],
			rel: ['https://assignments.api.brightspace.com/rels/annotations'],
		},
		{
			class: ['folder-type', 'individual'],
			rel: ['https://assignments.api.brightspace.com/rels/folder-type'],
		},
		{
			class: ['submissions-rule'],
			rel: [
				'https://assignments.api.brightspace.com/rels/submissions-rule',
			],
			properties: {
				rule: { title: 'All submissions are kept', value: 'keepall' },
			},
		},
		{
			class: ['files-submission-limit'],
			rel: [
				'https://assignments.api.brightspace.com/rels/files-submission-limit',
			],
			properties: { limit: 'unlimited' },
		},
		{
			class: ['notification-email'],
			rel: [
				'https://assignments.api.brightspace.com/rels/notification-email',
			],
			properties: { email: '' },
		},
		{
			class: ['richtext', 'instructions'],
			rel: [
				'item',
				'https://assignments.api.brightspace.com/rels/instructions',
			],
			properties: { text: '', html: '' },
		},
	],
	links: [
		{
			rel: ['self'],
			href: '/w2d-folder4',
		},
		{
			rel: ['service'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.assignments.api.proddev.d2l/6609',
		},
		{
			rel: [
				'https://activities.api.brightspace.com/rels/internal-activity-id',
			],
			href: 'https://ids.brightspace.com/activities/dropbox/Dev-20',
		},
		{
			rel: ['https://assignments.api.brightspace.com/rels/attachments'],
			href: '/w2d-folder4/attachments',
		},
		{
			rel: ['https://activities.api.brightspace.com/rels/activity-usage'],
			href: 'https://2b9c692b-7fae-4557-bc79-66af9b71e0fc.activities.api.proddev.d2l/activities/6606_2000_4/usages/6609',
		},
		{
			rel: ['https://api.brightspace.com/rels/organization'],
			href: '/w2d-orgs-2',
		},
		{
			rel: ['alternate'],
			type: 'text/html',
			href: 'http://d2l-annbrgvfg3d.desire2learn.d2l:44446/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=6609&db=4',
		},
	],
	rel: ['https://assignments.api.brightspace.com/rels/assignment'],
};
