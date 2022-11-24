/**
 * @param {{[date: string]: string}} dates 
 */
export const generateIcsEvents = (dates) => {
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
			+ `UID:${formattedDate}-${timestamp}\n`
			+ `SUMMARY:${subject}\n`
			+ 'END:VEVENT\n'
		);
	};

	let events = '';

	for (const date in dates) events = events + generateIcsEvent(date, dates[date]);

	return events;
};

/**
 * @param {string} events 
 */
export const generateIcs = (events) => (
	'BEGIN:VCALENDAR\n'
	+ 'VERSION:2.0\n'
	+ 'PRODID:-//GitHub@hyunbinseo//holidays-kr//KO\n'
	+ events
	+ 'END:VCALENDAR'
);
