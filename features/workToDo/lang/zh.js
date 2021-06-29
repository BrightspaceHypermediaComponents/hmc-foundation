/* eslint quotes: 0 */
export default {
	activitiesAvailable: "即将到期或结束的活动已完成！选中“查看所有工作”以查看即将发布的工作。", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: '现在已经全部清楚！', // Displayed as header line in widget text when there are no activities
	assignment: '作业',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: '返回主页', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: '清单', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: '稍后回来查看您是否有工作要完成。', // 'Empty state' - When there are no activities in full page view
	content: '内容', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: '课程', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{dayOfWeek}，{month} {dayOfMonth}', // Indicates that the below list of activities are due
	discussion: '讨论', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: '查看所有作业', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: '转至“发现”', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: '加载更多', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: '显示更多已分配的活动', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: '待办事项', // Widget title
	noActivities: '您没有具有到期或结束日期的活动。', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: '{firstName} 没有具有到期或结束日期的活动。', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNameless: '没有具有到期或结束日期的活动。', // 'Empty state' - When widget has no activities in full page view, when we want to refer to the user in the third person but don't know their name
	noActivitiesFutureActivities: "您没有到期或即将结束的活动。稍后回来或查看所有工作以查看即将发布的工作。",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "{firstName} 没有到期或即将结束的活动。稍后回来或查看所有工作以查看即将发布的工作。", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivitiesNameless: "没有到期或即将结束的活动。稍后回来或查看所有工作以查看即将发布的工作。", // Shown under the same conditions as noActivitiesFutureActivities, when we want to refer to the user in the third person but don't know their name
	noActivitiesNoFutureActivities: '您没有具有到期或结束日期的活动。稍后回来查看您是否有工作要完成。', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: '{firstName} 没有具有到期或结束日期的活动。稍后回来查看 {firstname} 是否有工作要完成。', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivitiesNameless: '没有具有到期或结束日期的活动。稍后回来查看是否有工作要完成。', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to refer to the user in the third person but don't know their name
	nothingHere: "没有任何工作...", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: '过期', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	xActivities: '{count, plural, =1 {1 activity} other {{count} activities}}', // Label text for pluralizing activites.
	quiz: '测验', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: '开始日期 {startDate}', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: '调查', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: '即将分配的作业', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: '查看所有作业', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: '{count, plural, =1 {1 周} other {{count} 周}} 清除！', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: '截止日期 {dueDate}', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: '结束日期 {endDate}' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
