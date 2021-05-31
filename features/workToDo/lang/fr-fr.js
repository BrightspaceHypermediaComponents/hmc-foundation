/* eslint quotes: 0 */
export default {
	activitiesAvailable: "Les activités à remettre ou se terminant bientôt sont terminées ! Cochez Afficher tout le travail pour voir les activités à venir.", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: 'Il n’y a rien pour le moment !', // Displayed as header line in widget text when there are no activities
	assignment: 'Devoir',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: 'Retourner à la page d’accueil', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: 'Liste de contrôle', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: 'Revenez plus tard pour vérifier si vous avez du travail à faire.', // 'Empty state' - When there are no activities in full page view
	content: 'Contenu', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: 'Cours', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{dayOfWeek} {dayOfMonth} {month}', // Indicates that the below list of activities are due
	discussion: 'Discussion', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: 'Afficher tout le travail', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: 'Accéder à Découvrir', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: 'Charger plus', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: 'Afficher plus d’activités attribuées', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: 'Travail à faire', // Widget title
	noActivities: 'Vous n’avez aucune activité avec des dates d’échéance ou de fin disponibles.', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: '{firstName} has no activities with due or end dates available.', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNameless: 'There are no activities with due or end dates available.', // 'Empty state' - When widget has no activities in full page view, when we want to refer to the user in the third person but don't know their name
	noActivitiesFutureActivities: "Vous n’avez aucune activité à remettre ou se terminant bientôt. Revenez plus tard ou cliquez sur Afficher tout le travail pour voir les activités à venir.",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "{firstName} has no activities due or ending soon. Come back later or View All Work to see what's coming next.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivitiesNameless: "There are no activities due or ending soon. Come back later or View All Work to see what's coming next.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to refer to the user in the third person but don't know their name
	noActivitiesNoFutureActivities: 'Vous n’avez aucune activité avec des dates d’échéance ou de fin disponibles. Revenez plus tard pour vérifier si vous avez du travail à faire.', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: '{firstName} has no activities with due or end dates available. Come back later to see if {firstname} has work to do.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivitiesNameless: 'There are no activities with due or end dates available. Come back later to see if there is work to do.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to refer to the user in the third person but don't know their name
	nothingHere: "Il n’y a rien ici...", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: 'En retard', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	quiz: 'Questionnaire', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: 'Débute le {startDate}', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: 'Sondage', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: 'Travail à venir', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: 'Afficher tout le travail', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: '{num, plural, =1 {1 semaine} other {{count} semaines}} terminée(s) !', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: 'Dû le {dueDate}', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: 'Fin le {endDate}' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
