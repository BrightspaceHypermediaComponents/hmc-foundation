/* eslint quotes: 0 */
export default {
	activitiesAvailable: "Aktiviteter, der er forfaldne eller slutter snart, er fuldført! Kontrollér Se alle opgaver for at se, hvad der er på vej.", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: 'Alt er ryddet nu!', // Displayed as header line in widget text when there are no activities
	assignment: 'Opgave',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: 'Tilbage til startsiden', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: 'Tjekliste', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: 'Kom tilbage senere for at se, om du har opgaver, der skal udføres.', // 'Empty state' - When there are no activities in full page view
	content: 'Indhold', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: 'Kursus', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{dayOfWeek}, {month} {dayOfMonth}', // Indicates that the below list of activities are due
	discussion: 'Diskussion', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: 'Se alle opgaver', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: 'Gå til Registrer', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: 'Indlæs flere', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: 'Vis flere tildelte aktiviteter', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: 'Opgaver, der skal udføres', // Widget title
	noActivities: 'Du har ingen aktiviteter, hvor forfalds- eller slutdatoer er tilgængelige.', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: '{firstName} har ingen aktiviteter, hvor forfalds- eller slutdatoer er tilgængelige.', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNameless: 'Der er ingen aktiviteter, hvor forfalds- eller slutdatoer er tilgængelige.', // 'Empty state' - When widget has no activities in full page view, when we want to refer to the user in the third person but don't know their name
	noActivitiesFutureActivities: "Du har ingen gennemførte aktiviteter, der forfalder eller slutter snart. Kom tilbage senere eller Se alle opgaver for at se, hvad der er på vej.",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "{firstName} har ingen gennemførte aktiviteter, der forfalder eller slutter snart. Kom tilbage senere eller Se alle opgaver for at se, hvad der er på vej.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivitiesNameless: "Der er ingen gennemførte aktiviteter, der forfalder eller slutter snart. Kom tilbage senere eller Se alle opgaver for at se, hvad der er på vej.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to refer to the user in the third person but don't know their name
	noActivitiesNoFutureActivities: 'Du har ingen aktiviteter, hvor forfalds- eller slutdatoer er tilgængelige. Kom tilbage senere for at se, om du har opgaver, der skal udføres.', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: '{firstName} har ingen aktiviteter, hvor forfalds- eller slutdatoer er tilgængelige. Kom tilbage senere for at se, om {firstName} har opgaver, der skal udføres.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivitiesNameless: 'Der er ingen aktiviteter, hvor forfalds- eller slutdatoer er tilgængelige. Kom tilbage senere for at se, om der er opgaver, der skal udføres.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to refer to the user in the third person but don't know their name
	nothingHere: "Der er intet her ...", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: 'Forsinket', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	xActivities: '{count, plural, =1 {1 aktivitet} other {{count} aktiviteter}}', // Label text for pluralizing activites.
	quiz: 'Eksamination', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: 'Starter d. {startDate}', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: 'Undersøgelse', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: 'Forestående opgaver', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: 'Se alle opgaver', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: '{count, plural, =1 {1 week} other {{count} weeks}} ryd!', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: 'Forfalder {dueDate}', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: 'Slutter {endDate}' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
