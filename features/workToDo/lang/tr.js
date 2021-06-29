/* eslint quotes: 0 */
export default {
	activitiesAvailable: "Teslim tarihi gelen veya yaklaşan etkinlikler tamamlandı! Daha sonraki etkinlikleri görmek için Tüm İşleri Görüntüle seçeneğini işaretleyin.", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	allClear: 'Şimdilik Her Şey Tamamlandı!', // Displayed as header line in widget text when there are no activities
	assignment: 'Ödev',  // Meta-data descriptor that informs which type of activity is being displayed on a line item
	backToD2L: 'Ana Sayfaya Geri Dön', // Displayed in the immersive navbar to escape out of fullscreen view
	checklist: 'Kontrol Listesi', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	comeBackNoFutureActivities: 'Üzerinde çalışacağınız bir iş olup olmadığını görmek için daha sonra tekrar ziyaret edin.', // 'Empty state' - When there are no activities in full page view
	content: 'İçerik', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	course: 'Ders', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	dateHeader: '{dayOfWeek}, {dayOfMonth} {month}', // Indicates that the below list of activities are due
	discussion: 'Tartışma', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	fullViewLink: 'Tüm İşleri Görüntüle', // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover: 'Keşfet'e Git', // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	loadMore: 'Daha Fazla Yükle', // Button text displayed in 'Fullscreen View' that allows the user to access the next page of activities which will append to the bottom of the list currently shown
	loadMoreDescription: 'Daha fazla atanmış etkinlik görüntüle', // Additional description text to accompany the load more button for additional clarity for the user
	workToDo: 'Yapılacak İşler', // Widget title
	noActivities: 'Teslim veya sona erme tarihi bulunan etkinliğiniz yok.', // 'Empty state' - When widget has no activities in full page view
	noActivitiesName: '{firstName} kullanıcısının teslim veya sona erme tarihi mevcut olan bir etkinliği yok.', // 'Empty state' - When widget has no activities in full page view, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNameless: 'Teslim veya sona erme tarihi bulunan bir etkinlik yok.', // 'Empty state' - When widget has no activities in full page view, when we want to refer to the user in the third person but don't know their name
	noActivitiesFutureActivities: "Teslim veya sona erme tarihi yaklaşmakta olan etkinliğiniz yok. Daha sonraki etkinlikleri görmek için daha sonra tekrar ziyaret edin veya Tüm İşleri Görüntüleyin.",  // 'Empty View' - When widget has no activities to display within the next few weeks & there are activities in the future
	noActivitiesFutureActivitiesName: "{firstName} kullanıcısının teslim veya sona erme tarihi yaklaşmakta olan bir etkinliği yok. Daha sonraki etkinlikleri görmek için daha sonra tekrar ziyaret edin veya Tüm İşleri Görüntüleyin.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesFutureActivitiesNameless: "Teslim veya sona erme tarihi yaklaşmakta olan bir etkinlik yok. Daha sonraki etkinlikleri görmek için daha sonra tekrar ziyaret edin veya Tüm İşleri Görüntüleyin.", // Shown under the same conditions as noActivitiesFutureActivities, when we want to refer to the user in the third person but don't know their name
	noActivitiesNoFutureActivities: 'Teslim veya sona erme tarihi bulunan etkinliğiniz yok. Üzerinde çalışacağınız bir iş olup olmadığını görmek için daha sonra tekrar ziyaret edin.', // 'Empty View' - When widget has no activities to display within the next few weeks & there are no more activities in the future
	noActivitiesNoFutureActivitiesName: '{firstName} kullanıcısının teslim veya sona erme tarihi mevcut olan bir etkinliği yok. {firstname} kullanıcısının yapacak işi olup olmadığını görmek için daha sonra tekrar kontrol edin.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to show the user's name instead of referring to them as "you"
	noActivitiesNoFutureActivitiesNameless: 'Teslim veya sona erme tarihi bulunan bir etkinlik yok. Yapılacak iş olup olmadığını görmek için daha sonra tekrar kontrol edin.', // Shown under the same conditions as noActivitiesNoFutureActivities, when we want to refer to the user in the third person but don't know their name
	nothingHere: "Hiçbir şey yok...", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue: 'Süresi Dolmuş', // Indicates that the below list of activities are overdue (have a due date that is in the past)
	xActivities: '{count, plural, =1 {1 activity} other {{count} activities}}', // Label text for pluralizing activites.
	quiz: 'Sınav', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	StartsWithDate: 'Başlama Tarihi: {startDate}', // show Start Date on status indicator when an activity starts in the future - formatted like "Starts Aug 15"
	survey: 'Anket', // Meta-data descriptor that informs which type of activity is being displayed on a line item
	upcoming: 'Yaklaşan İş', // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork: 'Tüm İşleri Görüntüle', // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
	xWeeksClear: '{count, plural, =1 {1 hafta} other {{count} hafta}} tamamlandı!', // 'Empty state' - Header when widget has no activities to display within the next x weeks
	dueWithDate: 'Teslim Tarihi {dueDate}', // show due Date on status indicator when an activity due in the future - formatted like "Due Aug 15"
	endWithDate: 'Sona Erme Tarihi {endDate}' // show end Date on status indicator when an activity end in the future - formatted like "End Aug 15"
};
