/* eslint quotes: 0 */
export default {
	activitiesAvailable: "即將截止或結束的活動都已完成！請查看「檢視所有作業」，來瞭解接下來的活動。", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: '目前已全數清空！', // Displayed as header line in widget text when there are no activities
	assignment: '作業',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: '返回首頁', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: '檢查表', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: '請稍後再回來看看是否有工作要進行。', // 'Empty state' - When there are no activities in full page view
	content: '內容', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: '課程', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{dayOfWeek}，{month} {dayOfMonth}', // Indicates that the below list of activities are due
	discussion: '討論', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: '檢視所有作業', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: '前往「探索」', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: '載入更多', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: '顯示更多已指派的活動', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: '待做作業', // Widget title
	noActivities: '您沒有具有截止日期或結束日期的活動。', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: '{firstName} has no activities with due or end dates available.', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNameless: 'There are no activities with due or end dates available.', // 'Empty state' - When widget has no activities in full page view, when we want to refer to the user in the third person but don't know their name
	noActivitiesFutureActivities: "您沒有即將截止或結束的活動。請稍後再回來，或透過「檢視所有工作」來瞭解接下來的活動。",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "{firstName} has no activities due or ending soon. Come back later or View All Work to see what's coming next.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivitiesNameless: "There are no activities due or ending soon. Come back later or View All Work to see what's coming next.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to refer to the user in the third person but don't know their name
	noActivitiesNoFutureActivities: '您沒有具有截止日期或結束日期的活動。請稍後再回來看看是否有工作要進行。', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: '{firstName} has no activities with due or end dates available. Come back later to see if {firstname} has work to do.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivitiesNameless: 'There are no activities with due or end dates available. Come back later to see if there is work to do.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to refer to the user in the third person but don't know their name
	nothingHere: "這裡沒有任何內容...", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: '逾期', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	quiz: '測驗', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: '開始於 {startDate}', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: '問卷調查', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: '近期作業', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: '檢視所有作業', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: '{count, plural, =1 {1 週} other {{count} 週}}內均已清空！', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: '截止日期：{dueDate}', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: '結束日期：{endDate}' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
