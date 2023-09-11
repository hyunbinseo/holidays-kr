import { writeFileSync } from 'node:fs';
import type { Year } from 'source';
import { checkPreset } from './check-preset';
import { generateCsv } from './content-csv';
import { generateIcs, generateIcsEvents } from './content-ics';

export const writeFiles = (
	type: 'holiday' | 'anniversaries',
	yearlyPresets: Map<number, [Year, number]>,
) => {
	const path = type === 'holiday' ? './public/' : './public/anniversaries/';
	const calendarName =
		'대한민국의 ' + (type === 'holiday' ? '공휴일' : '기념일');

	let cumulatedIcsEvents = '';
	let cumulatedJsonEvents: string[] = [];

	for (const [year, [preset, id]] of yearlyPresets) {
		if (type === 'holiday') checkPreset(preset, year);

		writeFileSync(`${path}${year}.csv`, generateCsv(preset));

		const icsEvents = generateIcsEvents(preset, id);
		writeFileSync(`${path}${year}.ics`, generateIcs(icsEvents, calendarName));
		cumulatedIcsEvents = icsEvents + cumulatedIcsEvents;

		const jsonEvents = JSON.stringify(Object.fromEntries(preset), null, '\t');
		writeFileSync(`${path}${year}.json`, jsonEvents);
		cumulatedJsonEvents.push(`"${year}":${jsonEvents}`);
	}

	writeFileSync(
		`${path}basic.ics`,
		generateIcs(cumulatedIcsEvents, calendarName),
	);
	writeFileSync(`${path}basic.json`, `{${cumulatedJsonEvents.join(',')}}`);
};
