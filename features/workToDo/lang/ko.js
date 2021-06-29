/* eslint quotes: 0 */
export default {
	activitiesAvailable: "곧 완료되거나 끝나는 활동이 완료되었습니다! 모든 작업 보기 를 선택하여 나중에 어떤 작업을 할 수 있는지 확인합니다.", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: '지금 모두 지우기!', // Displayed as header line in widget text when there are no activities
	assignment: '과제',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: '홈으로 돌아가기', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: '체크리스트', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: '나중에 돌아와 해야 할 일이 있는지 확인합니다.', // 'Empty state' - When there are no activities in full page view
	content: '콘텐츠', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: '강의', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{dayOfWeek}, {month} {dayOfMonth}', // Indicates that the below list of activities are due
	discussion: '토론', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: '모든 작업 보기', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: '검색으로 이동합니다.', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: '더 많이 로드', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: '할당된 활동을 더 많이 표시합니다.', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: '할 일', // Widget title
	noActivities: '기한 또는 종료일이 있는 활동이 없습니다.', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: '{firstName} 님은 기한 또는 종료일이 있는 활동이 없습니다.', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNameless: '기한 또는 종료일이 있는 활동이 없습니다.', // 'Empty state' - When widget has no activities in full page view, when we want to refer to the user in the third person but don't know their name
	noActivitiesFutureActivities: "기한이 만료되거나 곧 종료되는 활동이 없습니다. 나중에 다시 돌아오거나 모든 작업 보기 를 통해 다음 내용을 확인할 수 있습니다.",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "{firstName} 님은 기한이 만료되거나 곧 종료되는 활동이 없습니다. 나중에 다시 돌아오거나 모든 작업 보기를 통해 다음 내용을 확인할 수 있습니다.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivitiesNameless: "기한이 만료되거나 곧 종료되는 활동이 없습니다. 나중에 다시 돌아오거나 모든 작업 보기를 통해 다음 내용을 확인할 수 있습니다.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to refer to the user in the third person but don't know their name
	noActivitiesNoFutureActivities: '기한 또는 종료일이 있는 활동이 없습니다. 나중에 돌아와 해야 할 일이 있는지 확인합니다.', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: '{firstName} 님은 기한 또는 종료일이 있는 활동이 없습니다. {firstName} 님이 나중에 돌아와 해야 할 일이 있는지 확인합니다.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivitiesNameless: '기한 또는 종료일이 있는 활동이 없습니다. 나중에 돌아와 해야 할 일이 있는지 확인합니다.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to refer to the user in the third person but don't know their name
	nothingHere: "여기에 아무것도 없습니다...", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: '기한 경과', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	xActivities: '{count, plural, =1 {1 activity} other {{count} activities}}', // Label text for pluralizing activites.
	quiz: '퀴즈', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: '{startDate}에 시작', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: '설문조사', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: '예정된 작업', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: '모든 작업 보기', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: '{count, plural, =1 {1주} other {{count}주}} 완료!', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: '기한 {dueDate}일', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: '{endDate}일에 종료' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
