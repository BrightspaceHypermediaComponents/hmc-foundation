/* eslint quotes: 0 */
export default {
	activitiesAvailable: "In nächster Zeit fällige oder endende Aktivitäten sind abgeschlossen! Aktivieren Sie „Alle Arbeiten anzeigen“, um zu sehen, was danach kommt.", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: 'Soweit alles klar!', // Displayed as header line in widget text when there are no activities
	assignment: 'Aufgabe',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: 'Zurück zur Startseite', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: 'Checkliste', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: 'Sehen Sie später erneut nach, ob Sie unerledigte Arbeit haben.', // 'Empty state' - When there are no activities in full page view
	content: 'Inhalt', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: 'Kurs', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{dayOfWeek}, {month} {dayOfMonth}', // Indicates that the below list of activities are due
	discussion: 'Diskussion', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: 'Alle Aufgaben anzeigen', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: 'Zu Discover', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: 'Mehr laden', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: 'Weitere zugewiesene Aktivitäten anzeigen', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: 'Ausstehende Aufgaben', // Widget title
	noActivities: 'Sie haben keine Aktivitäten mit verfügbarem Fälligkeits- oder Enddatum.', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: 'Es sind für {firstName} keine Aktivitäten mit verfügbarem Fälligkeits- oder Enddatum vorhanden.', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNameless: 'Es gibt keine Aktivitäten mit verfügbarem Fälligkeits- oder Enddatum.', // 'Empty state' - When widget has no activities in full page view, when we want to refer to the user in the third person but don't know their name
	noActivitiesFutureActivities: "Es sind keine Aktivitäten vorhanden, die in Kürze fällig sind oder enden. Kommen Sie später zurück oder sehen Sie sich alle Arbeiten an, um zu sehen, was als Nächstes kommt.",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "Es sind für {firstName} keine Aktivitäten vorhanden, die in Kürze fällig sind oder enden. Kommen Sie später zurück oder sehen Sie sich alle Arbeiten an, um zu sehen, was als Nächstes kommt.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivitiesNameless: "Es gibt keine Aktivitäten, die in Kürze fällig sind oder enden. Kommen Sie später zurück oder sehen Sie sich alle Arbeiten an, um zu sehen, was als Nächstes kommt.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to refer to the user in the third person but don't know their name
	noActivitiesNoFutureActivities: 'Sie haben keine Aktivitäten mit verfügbarem Fälligkeits- oder Enddatum. Sehen Sie später erneut nach, ob Sie unerledigte Arbeit haben.', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: 'Es sind für {firstName} keine Aktivitäten mit verfügbarem Fälligkeits- oder Enddatum vorhanden. Sehen Sie später erneut nach, ob für {firstName} unerledigte Arbeit vorhanden ist.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivitiesNameless: 'Es gibt keine Aktivitäten mit verfügbarem Fälligkeits- oder Enddatum. Sehen Sie später erneut nach, ob unerledigte Arbeit vorhanden ist.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to refer to the user in the third person but don't know their name
	nothingHere: "Hier gibt es nichts...", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: 'Überfällig', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	xActivities: '{count, plural, =1 {1 activity} other {{count} activities}}', // Label text for pluralizing activites.
	quiz: 'Test', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: 'Beginnt am {startDate}', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: 'Umfrage', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: 'Anstehende Aufgaben', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: 'Alle Aufgaben anzeigen', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: '{count, plural, =1 {1 Woche} other {{count} Wochen}} ohne Termine!', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: 'Abgabetermin: {dueDate}', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: 'Ende {endDate}' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
