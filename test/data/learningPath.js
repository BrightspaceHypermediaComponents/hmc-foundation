export const learningPathExisting = {
	class: ['named-entity', 'describable-entity', 'draft-published-entity', 'published', 'active', 'learning-path'],
	properties: {
		'name':'[object Object]',
		'code':'LP',
		'startDate':null,
		'endDate':null,
		'isActive':true,
		'description':'description of my LP'
	},
	entities: [
		{'class':['richtext',  'description'],  'rel':['item'], 'properties':{'text':'description of my LP', 'html':'description of my LP'}},
		{'class':['color'],  'rel':['https://api.brightspace.com/rels/color'],  'properties':{'hexString':'#2f5e00',  'description':''}},
		{'class':['course-image'],  'rel':['https://api.brightspace.com/rels/organization-image',  'nofollow'],  'href':'/images/123456'},
		{'class':['relative-uri'],  'rel':['item',  'https://api.brightspace.com/rels/organization-homepage'],  'properties':{'path':'/learningpaths/123231/View'}}
	],
	actions: [
		{'href':'/update/name',  'name':'update-name',  'method':'PATCH',  'fields':[{'class':['required'],  'type':'text',  'name':'name',  'value':'[object Object]'}]},
		{'href':'/description/update',  'name':'update-description',  'method':'PATCH',  'fields':[{'class':['required'],  'type':'text',  'name':'description',  'value':'description of my LP'}]},
		{'href':'/update/draft',  'name':'update-draft',  'method':'PATCH',  'fields':[{'type':'checkbox',  'name':'draft',  'value':false}]},
		{'href':'/set/catalog/image',  'name':'set-catalog-image',  'method':'POST',  'fields':[{'type':'text',  'name':'imagePath',  'value':''}]},
		{'href':'/remove/homepage/banner',  'name':'remove-homepage-banner',  'method':'PUT',  'fields':[{'type':'hidden',  'name':'showCourseBanner',  'value':false}]},
		{'href':'/delete/item',  'name':'delete',  'method':'DELETE'}
	]
};

export const learningPathUpdated = {
	class: ['named-entity', 'describable-entity', 'draft-published-entity', 'published', 'active', 'learning-path'],
	properties: {
		'name':'updated name',
		'code':'LP',
		'startDate':null,
		'endDate':null,
		'isActive':true,
		'description': 'updated description'
	},
	entities: [
		{'class':['richtext',  'description'],  'rel':['item'], 'properties':{'text':'description of my LP', 'html':'description of my LP'}},
		{'class':['color'],  'rel':['https://api.brightspace.com/rels/color'],  'properties':{'hexString':'#2f5e00',  'description':''}},
		{'class':['course-image'],  'rel':['https://api.brightspace.com/rels/organization-image',  'nofollow'],  'href':'/images/123456'},
		{'class':['relative-uri'],  'rel':['item',  'https://api.brightspace.com/rels/organization-homepage'],  'properties':{'path':'/learningpaths/123456/View'}}
	],
	actions: [
		{'href':'/update/name',  'name':'update-name',  'method':'PATCH',  'fields':[{'class':['required'],  'type':'text',  'name':'name',  'value':'[object Object]'}]},
		{'href':'/description/update',  'name':'update-description',  'method':'PATCH',  'fields':[{'class':['required'],  'type':'text',  'name':'description',  'value':'description of my LP'}]},
		{'href':'/update/draft',  'name':'update-draft',  'method':'PATCH',  'fields':[{'type':'checkbox',  'name':'draft',  'value':false}]},
		{'href':'/set/catalog/image',  'name':'set-catalog-image',  'method':'POST',  'fields':[{'type':'text',  'name':'imagePath',  'value':''}]},
		{'href':'/remove/homepage/banner',  'name':'remove-homepage-banner',  'method':'PUT',  'fields':[{'type':'hidden',  'name':'showCourseBanner',  'value':false}]},
		{'href':'/delete/item',  'name':'delete',  'method':'DELETE'}
	]
};

export const learningPathNew = {
	class: ['named-entity', 'describable-entity', 'draft-published-entity', 'published', 'active', 'learning-path'],
	properties: {
		'name':'',
		'code':'LP',
		'startDate':null,
		'endDate':null,
		'isActive':true,
		'description':''
	},
	entities: [
		{'class':['richtext',  'description'],  'rel':['item'], 'properties':{'text':'', 'html':''}},
		{'class':['color'],  'rel':['https://api.brightspace.com/rels/color'],  'properties':{'hexString':'#2f5e00',  'description':''}},
		{'class':['course-image'],  'rel':['https://api.brightspace.com/rels/organization-image',  'nofollow'],  'href':'/images/123456'},
		{'class':['relative-uri'],  'rel':['item',  'https://api.brightspace.com/rels/organization-homepage'],  'properties':{'path':'/learningpaths/123456/View'}}
	],
	actions: [
		{'href':'/update/name',  'name':'update-name',  'method':'PATCH',  'fields':[{'class':['required'],  'type':'text',  'name':'name',  'value':'[object Object]'}]},
		{'href':'/description/update',  'name':'update-description',  'method':'PATCH',  'fields':[{'class':['required'],  'type':'text',  'name':'description',  'value':'description of my LP'}]},
		{'href':'/update/draft',  'name':'update-draft',  'method':'PATCH',  'fields':[{'type':'checkbox',  'name':'draft',  'value':false}]},
		{'href':'/set/catalog/image',  'name':'set-catalog-image',  'method':'POST',  'fields':[{'type':'text',  'name':'imagePath',  'value':''}]},
		{'href':'/remove/homepage/banner',  'name':'remove-homepage-banner',  'method':'PUT',  'fields':[{'type':'hidden',  'name':'showCourseBanner',  'value':false}]},
		{'href':'/delete/item',  'name':'delete',  'method':'DELETE'}
	]
};

export const learningPathMissingAction = {
	class: ['named-entity', 'describable-entity', 'draft-published-entity', 'published', 'active', 'learning-path'],
	properties: {
		'name':'[object Object]',
		'code':'LP',
		'startDate':null,
		'endDate':null,
		'isActive':true,
		'description':'description of my LP'
	},
	entities: [
		{'class':['richtext',  'description'],  'rel':['item'], 'properties':{'text':'description of my LP', 'html':'description of my LP'}},
		{'class':['color'],  'rel':['https://api.brightspace.com/rels/color'],  'properties':{'hexString':'#2f5e00',  'description':''}},
		{'class':['course-image'],  'rel':['https://api.brightspace.com/rels/organization-image',  'nofollow'],  'href':'/images/123456'},
		{'class':['relative-uri'],  'rel':['item',  'https://api.brightspace.com/rels/organization-homepage'],  'properties':{'path':'/learningpaths/123231/View'}}
	],
	actions: [
	]
};
