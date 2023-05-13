import type { DateString, Year } from '../index';

export const generateIcsEvents = (preset: Year, id: number) => {
	const timestamp = new Date()
		.toISOString()
		.replace(/-|:/g, '')
		.replace(/.\d{3}Z/, 'Z');

	const generateIcsEvent = (date: DateString, subject: string) => {
		const formattedDate = date.replace(/-/g, '');
		return (
			'BEGIN:VEVENT\n' +
			`DTSTART;VALUE=DATE:${formattedDate}\n` +
			`DTSTAMP:${timestamp}\n` +
			`UID:${formattedDate}-${id}\n` +
			`SUMMARY:${subject}\n` +
			'CLASS:PUBLIC\n' + // 공개
			'TRANSP:TRANSPARENT\n' + // !바쁨
			'END:VEVENT\n'
		);
	};

	let events = '';

	for (const [date, subject] of preset)
		events = events + generateIcsEvent(date, subject);

	return events;
};

export const generateIcs = (events: string) =>
	'BEGIN:VCALENDAR\n' +
	'VERSION:2.0\n' +
	'PRODID:-//GitHub@hyunbinseo//holidays-kr//KO\n' +
	'X-WR-CALNAME:대한민국의 공휴일\n' +
	'X-WR-TIMEZONE:Asia/Seoul\n' +
	'X-WR-CALDESC:https://github.com/hyunbinseo/holidays-kr\n' +
	events +
	'END:VCALENDAR';
