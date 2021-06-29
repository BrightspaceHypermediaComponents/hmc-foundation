/* eslint quotes: 0 */
export default {
	activitiesAvailable: "まもなく期限を迎えるまたは終了するアクティビティは完了しました。［すべての学習の表示］をチェックして、次のアクティビティを確認してください", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: '今はすべて完了！', // Displayed as header line in widget text when there are no activities
	assignment: '課題',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: 'ホームに戻る', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: 'チェックリスト', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: '後でまた、アクティビティがあるか確認してください。', // 'Empty state' - When there are no activities in full page view
	content: 'コンテンツ', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: 'コース', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{month} {dayOfMonth}、{dayOfWeek}', // Indicates that the below list of activities are due
	discussion: 'ディスカッション', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: 'すべての学習の表示', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: '［Discover］に移動', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: 'さらに読み込む', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: '割り当てられたその他のアクティビティを表示します', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: '取り組むこと', // Widget title
	noActivities: '期限または終了日が設定されたアクティビティはありません。', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: '{firstName} さんには期限または終了日が設定されたアクティビティはありません。', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNameless: '期限または終了日が設定されたアクティビティはありません。', // 'Empty state' - When widget has no activities in full page view, when we want to refer to the user in the third person but don't know their name
	noActivitiesFutureActivities: "期限または終了日が近いアクティビティはありません。後でまた確認するか、［すべての学習の表示］をクリックして次のアクティビティを確認してください。",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "{firstName} さんには、期限または終了日が近いアクティビティはありません。後でまた確認するか、［すべての学習の表示］をクリックして次のアクティビティを確認してください。", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivitiesNameless: "期限または終了日が近いアクティビティはありません。後でまた確認するか、［すべての学習の表示］をクリックして次のアクティビティを確認してください。", // Shown under the same conditions as noActivitiesFutureActivities, when we want to refer to the user in the third person but don't know their name
	noActivitiesNoFutureActivities: '期限または終了日が設定されたアクティビティはありません。後でまた、アクティビティがあるか確認してください。', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: '{firstName} さんには期限または終了日が設定されたアクティビティはありません。後でまた、{firstname} さんにアクティビティがあるか確認してください。', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivitiesNameless: '期限または終了日が設定されたアクティビティはありません。後でまた、アクティビティがあるか確認してください。', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to refer to the user in the third person but don't know their name
	nothingHere: "何もありません ...", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: '期限切れ', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	xActivities: '{count, plural, =1 {1 activity} other {{count} activities}}', // Label text for pluralizing activites.
	quiz: 'クイズ', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: '開始日 {startDate}', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: '調査', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: '今後の学習', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: 'すべての学習の表示', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: 'この先 {count, plural, =1 {1 週間} other {{count} 週間}}何もありません。', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: '期限 {dueDate}', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: '終了 {endDate}' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
