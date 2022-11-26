/**
 * @param {{[date: string]: string}} preset 
 * @param {number} id 
 * @returns 
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
			+ 'END:VEVENT\n'
		);
	};

	let events = '';

	for (const date of Object.keys(preset)) events = events + generateIcsEvent(date, preset[date]);

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
