/* eslint quotes: 0 */
export default {
	activitiesAvailable: "¡Se completaron las actividades pendientes o que finalizan pronto! Revise la sección “Ver todos los trabajos” para saber lo que viene después.", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: '¡Todo claro hasta ahora!', // Displayed as header line in widget text when there are no activities
	assignment: 'Asignación',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: 'Volver a Inicio', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: 'Lista de verificación', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: 'Vuelva más tarde para ver si tiene trabajo que hacer.', // 'Empty state' - When there are no activities in full page view
	content: 'Contenido', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: 'Curso', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{dayOfWeek}, {month} {dayOfMonth}', // Indicates that the below list of activities are due
	discussion: 'Debate', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: 'Ver todos los trabajos', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: 'Ir a Descubrir', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: 'Cargar más', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: 'Mostrar más actividades asignadas', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: 'Tareas pendientes', // Widget title
	noActivities: 'No tiene actividades pendientes o con fechas finales disponibles.', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: '{firstName} no tiene actividades pendientes o con fechas finales disponibles.', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNameless: 'No hay actividades pendientes o con fechas finales disponibles.', // 'Empty state' - When widget has no activities in full page view, when we want to refer to the user in the third person but don't know their name
	noActivitiesFutureActivities: "No tiene actividades pendientes o que finalicen pronto. Vuelva más tarde o revise la sección “Ver todos los trabajos” para ver próximas tareas.",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "{firstName} no tiene actividades pendientes o que finalicen pronto. Vuelva más tarde o revise la sección “Ver todos los trabajos” para ver próximas tareas.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivitiesNameless: "No hay actividades pendientes o que finalicen pronto. Vuelva más tarde o revise la sección “Ver todos los trabajos” para ver próximas tareas.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to refer to the user in the third person but don't know their name
	noActivitiesNoFutureActivities: 'No tiene actividades pendientes o con fechas finales disponibles. Vuelva más tarde para ver si tiene trabajo que hacer.', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: '{firstName} no tiene actividades pendientes o con fechas finales disponibles. Vuelva más tarde para ver si {firstname} tiene trabajo que hacer.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivitiesNameless: 'No hay actividades pendientes o con fechas finales disponibles. Vuelva más tarde para ver si hay trabajo que hacer.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to refer to the user in the third person but don't know their name
	nothingHere: "No hay nada aquí…", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: 'Vencida', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	xActivities: '{count, plural, =1 {1 activity} other {{count} activities}}', // Label text for pluralizing activites.
	quiz: 'Cuestionario', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: 'Inicia el {startDate}', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: 'Encuesta', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: 'Próximos trabajos', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: 'Ver todos los trabajos', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: '{count, plural, =1 {1 semana} other {{count} semanas}} despejada(s).', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: 'Fecha de entrega {dueDate}', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: 'Finaliza el {endDate}' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
