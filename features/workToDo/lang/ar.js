/* eslint quotes: 0 */
export default {
	activitiesAvailable: "اكتملت الأنشطة المستحقة أو التي تنتهي قريبًا! حدد عرض كل العمل للاطّلاع على الأنشطة المقبلة.", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: 'ما من أنشطة متوفرة في الوقت الحالي!', // Displayed as header line in widget text when there are no activities
	assignment: 'الفرض',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: 'العودة إلى الصفحة الرئيسية', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: 'قائمة التحقق', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: 'تحقق من الصفحة في وقت لاحق لمعرفة ما إذا كان ثمة عمل يجب إنجازه.', // 'Empty state' - When there are no activities in full page view
	comeBackNoFutureActivitiesName: 'Come back later to see if {firstName} has work to do.', // 'Empty state' - When there are no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	content: 'المحتوى', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: 'المقرر التعليمي', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{dayOfWeek}‏، {month} {dayOfMonth}', // Indicates that the below list of activities are due
	discussion: 'المناقشة', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: 'عرض كل العمل', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: 'الانتقال إلى أداة الاكتشاف', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: 'تحميل المزيد', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: 'عرض المزيد من الأنشطة المعيّنة', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: 'العمل الذي يجب إنجازه', // Widget title
	noActivities: 'ليس لديك أي أنشطة تتوفر تواريخ استحقاقها أو انتهائها.', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: '{firstName} has no activities with due or end dates available.', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivities: "ليس لديك أي أنشطة مستحقة أو تنتهي قريبًا. تحقق من الصفحة في وقت لاحق أو حدد عرض كل العمل للاطّلاع على الأنشطة المقبلة.",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "{firstName} has no activities due or ending soon. Come back later or View All Work to see what's coming next.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivities: 'ليس لديك أي أنشطة تتوفر تواريخ استحقاقها أو انتهائها. تحقق من الصفحة في وقت لاحق لمعرفة ما إذا كان ثمة عمل يجب إنجازه.', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: '{firstName} has no activities with due or end dates available. Come back later to see if {firstname} has work to do.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	nothingHere: "ما من أنشطة هنا...", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: 'الأنشطة التي تجاوزت تاريخ الاستحقاق', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	quiz: 'الاختبار', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: 'تاريخ البدء {startDate}', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: 'الاستطلاع', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: 'عمل قادم', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: 'عرض كل العمل', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: '{count, plural, =1 {أسبوع واحد} other {{count} من الأسابيع}} بدون أنشطة!', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: 'تاريخ الاستحقاق في {dueDate}', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: 'تاريخ الانتهاء في {endDate}' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
