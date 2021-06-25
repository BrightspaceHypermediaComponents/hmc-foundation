/* eslint quotes: 0 */
export default {
	activitiesAvailable: "Aktiviteter som förfaller eller snart avslutas är slutförda! Markera Visa alla jobb om du vill se vad som kommer längre fram.", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: 'Allt klart nu!', // Displayed as header line in widget text when there are no activities
	assignment: 'Uppgift',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: 'Tillbaka till hemsida', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: 'Checklista', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: 'Kom tillbaka senare för att se om du har arbete att göra.', // 'Empty state' - When there are no activities in full page view
	content: 'Innehåll', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: 'Kurs', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{dayOfWeek}, {dayOfMonth} {month}', // Indicates that the below list of activities are due
	discussion: 'Diskussion', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: 'Se allt', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: 'Gå till Upptäck', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: 'Läs in fler', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: 'Visa fler tilldelade aktiviteter', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: 'Arbete att göra', // Widget title
	noActivities: 'Du har inga aktiviteter med tillgängliga förfallodatum eller slutdatum.', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: '{firstName} har inga aktiviteter med tillgängliga förfallodatum eller slutdatum.', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNameless: 'Det finns inga aktiviteter med tillgängliga förfallodatum eller slutdatum.', // 'Empty state' - When widget has no activities in full page view, when we want to refer to the user in the third person but don't know their name
	noActivitiesFutureActivities: "Du har inga aktiviteter som förfaller eller avslutas snart. Kom tillbaka senare eller Visa alla jobb för att se vad som kommer härnäst.",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "{firstName} har inga aktiviteter som snart förfaller eller kommer att avslutas. Kom tillbaka senare eller välj Visa alla jobb för att se vad som kommer härnäst.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivitiesNameless: "Det finns inga aktiviteter som förfaller eller avslutas snart. Kom tillbaka senare eller välj Visa alla jobb för att se vad som kommer härnäst.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to refer to the user in the third person but don't know their name
	noActivitiesNoFutureActivities: 'Du har inga aktiviteter med tillgängliga förfallodatum eller slutdatum. Kom tillbaka senare för att se om du har arbete att göra.', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: '{firstName} har inga aktiviteter med tillgängliga förfallodatum eller slutdatum. Kom tillbaka senare för att se om det finns något att göra för {firstName}.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivitiesNameless: 'Det finns inga aktiviteter med tillgängliga förfallodatum eller slutdatum. Kom tillbaka senare för att se om det finns arbete att göra.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to refer to the user in the third person but don't know their name
	nothingHere: "Det finns inget här …", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: 'Försenad', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	quiz: 'Förhör', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: 'Börjar {startDate}', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: 'Enkät', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: 'Kommande jobb', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: 'Se allt', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: '{count, plural, =1 {1 vecka} other {{count} veckor}} rensat!', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: 'Förfaller {dueDate}', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: 'Slutar {endDate}' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
