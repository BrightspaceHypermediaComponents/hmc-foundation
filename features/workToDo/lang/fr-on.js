/* eslint quotes: 0 */
export default {
	activitiesAvailable: "Les activités arrivées à échéance ou qui se terminent bientôt ont été effectuées! Consultez Afficher tous les travaux pour voir ce qui vient ensuite.", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: 'Rien de plus pour l’instant!', // Displayed as header line in widget text when there are no activities
	assignment: 'Tâche',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: 'Retourner à la page d’accueil', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: 'Liste des rappels', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: 'Revenez plus tard pour voir si vous avez du tâche.', // 'Empty state' - When there are no activities in full page view
	content: 'Contenu', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: 'Cours', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{dayOfWeek} {dayOfMonth} {month}', // Indicates that the below list of activities are due
	discussion: 'Discussion', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: 'Afficher tous les travaux', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: 'Allez à Découvrir', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: 'En voir plus', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: 'Afficher plus d’activités attribuées', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: 'Travaux à faire', // Widget title
	noActivities: 'Vous n’avez pas d’activités avec les dates d’échéance ou de fin disponibles.', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: '{firstName} n’a pas d’activités avec les dates d’échéance ou de fin disponibles.', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNameless: 'Vous n’avez pas d’activités avec les dates d’échéance ou de fin disponibles.', // 'Empty state' - When widget has no activities in full page view, when we want to refer to the user in the third person but don't know their name
	noActivitiesFutureActivities: "Vous n’avez aucune activité qui vient à échéance ou qui se termine bientôt. Revenez plus tard ou consultez Afficher tous les travaux pour voir ce qui vient ensuite.",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "{firstName} n’a aucune activité qui vient à échéance ou qui se termine bientôt. Revenez plus tard ou consultez Afficher tous les travaux pour voir ce qui vient ensuite.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivitiesNameless: "Vous n’avez aucune activité qui vient à échéance ou qui se termine bientôt. Revenez plus tard ou consultez Afficher tous les travaux pour voir ce qui vient ensuite.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to refer to the user in the third person but don't know their name
	noActivitiesNoFutureActivities: 'Vous n’avez pas d’activités avec les dates d’échéance ou de fin disponibles. Revenez plus tard pour voir si vous avez du tâche.', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: '{firstName} n’a pas d’activités avec les dates d’échéance ou de fin disponibles. Revenez plus tard pour voir si {firstName} a du Tâche.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivitiesNameless: 'Vous n’avez pas d’activités avec les dates d’échéance ou de fin disponibles. Revenez plus tard pour voir s’il y a du Tâche.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to refer to the user in the third person but don't know their name
	nothingHere: "Il n’y a rien ici…", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: 'En retard', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	xActivities: '{count, plural, =1 {1 activité} other {{count} activités}}', // Label text for pluralizing activites.
	quiz: 'Questionnaire', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: 'Débute le {startDate}', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: 'Sondage', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: 'Travaux à venir', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: 'Afficher tous les travaux', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: 'Rien de plus pour {count, plural, =1 {1 semaine} other {{count} semaines}}!', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: 'Échéance le {dueDate}', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: 'Fin le {endDate}' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
