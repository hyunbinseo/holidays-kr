/**
 * @param {Object.<string, string>} preset
 * @param {number} id
 */
export const generateIcsEvents = (preset, id) => {
	const timestamp = new Date()
		.toISOString()
		.replaceAll(/-|:/g, '')
		.replace(/.\d{3}Z/, 'Z');

	const generateIcsEvent = (date, subject) => {
		const formattedDate = date.replaceAll('-', '');
		return (
			'BEGIN:VEVENT\n'
			+ `DTSTART;VALUE=DATE:${formattedDate}\n`
			+ `DTSTAMP:${timestamp}\n`
			+ `UID:${formattedDate}-${id}\n`
			+ `SUMMARY:${subject}\n`
			+ 'CLASS:PUBLIC\n' // 공개
			+ 'TRANSP:TRANSPARENT\n' // !바쁨
			+ 'END:VEVENT\n'
		);
	};

	let events = '';

	for (const date of Object.keys(preset)) events = events + generateIcsEvent(date, preset[date]);

	return events;
};

/** @param {string} events */
export const generateIcs = (events) => (
	'BEGIN:VCALENDAR\n'
	+ 'VERSION:2.0\n'
	+ 'PRODID:-//GitHub@hyunbinseo//holidays-kr//KO\n'
	+ 'X-WR-CALNAME:대한민국의 공휴일\n'
	+ 'X-WR-TIMEZONE:Asia/Seoul\n'
	+ 'X-WR-CALDESC:https://github.com/hyunbinseo/holidays-kr\n'
	+ events
	+ 'END:VCALENDAR'
);
