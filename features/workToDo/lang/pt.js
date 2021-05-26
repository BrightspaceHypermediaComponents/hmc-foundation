/* eslint quotes: 0 */
export default {
	activitiesAvailable: "As atividades que vencem ou encerram em breve estão concluídas! Marque Exibir todos os trabalhos para ver o que está por vir.", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: 'Tudo certo por enquanto!', // Displayed as header line in widget text when there are no activities
	assignment: 'Atividade',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: 'Voltar à página inicial', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: 'Lista de verificação', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: 'Volte mais tarde para verificar se você tem trabalho pendente.', // 'Empty state' - When there are no activities in full page view
	comeBackNoFutureActivitiesName: 'Come back later to see if {firstName} has work to do.', // 'Empty state' - When there are no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	content: 'Conteúdo', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: 'Curso', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{dayOfWeek}, {dayOfMonth} de {month}', // Indicates that the below list of activities are due
	discussion: 'Discussão', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: 'Exibir todos os trabalhos', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: 'Acessar o Discover', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: 'Carregar mais', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: 'Exibir mais atividades atribuídas', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: 'Trabalho pendente', // Widget title
	noActivities: 'Você não tem atividades com prazo ou datas finais disponíveis.', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: '{firstName} has no activities with due or end dates available.', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivities: "Você não tem atividades com prazo ou data final próxima. Volte mais tarde ou selecione Exibir todos os trabalhos para ver o que está por vir.",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "{firstName} has no activities due or ending soon. Come back later or View All Work to see what's coming next.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivities: 'Você não tem atividades com prazo ou datas finais disponíveis. Volte mais tarde para verificar se você tem trabalho pendente.', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: '{firstName} has no activities with due or end dates available. Come back later to see if {firstname} has work to do.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	nothingHere: "Não há nada aqui…", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: 'Atraso', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	quiz: 'Questionário', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: 'Início {startDate}', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: 'Pesquisa', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: 'Trabalhos futuros', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: 'Exibir todos os trabalhos', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: '{count, plural, =1 {1 semana} other {{count} semanas}} sem trabalhos a fazer!', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: 'Prazo {dueDate}', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: 'Término {endDate}' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
