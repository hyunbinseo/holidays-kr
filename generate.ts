import { writeFileSync } from 'node:fs';
import type { Year } from './index';
import { y2022, y2023 } from './index.js';
import { checkHolidays } from './scripts/check-holidays';
import { generateCsv } from './scripts/generate-csv';
import { generateIcs, generateIcsEvents } from './scripts/generate-ics';

const holidays = [
	[2023, [y2023, 1669289424786]],
	[2022, [y2022, 1669509606092]],
] satisfies Array<[number, [Year, number]]>;

let cumulatedIcsEvents = '';

for (const [year, [preset, id]] of holidays) {
	if (!/^2\d{3}$/.test(year.toString()))
		throw new Error(`Invalid year format - ${year}`);

	if (!id || typeof id !== 'number' || id.toString().length !== 13)
		throw new Error(`Invalid ID format - ${year}, ${id}`);

	checkHolidays(preset, year);

	const icsEvents = generateIcsEvents(preset, id);

	cumulatedIcsEvents += icsEvents;

	writeFileSync(`./public/${year}.csv`, generateCsv(preset));
	writeFileSync(`./public/${year}.ics`, generateIcs(icsEvents));
}

writeFileSync('./public/basic.json', JSON.stringify(holidays));
writeFileSync('./public/basic.ics', generateIcs(cumulatedIcsEvents));

writeFileSync(
	'./public/_redirects',
	`# ${Date.now()}\n/ https://github.com/hyunbinseo/holidays-kr#%EB%AC%B8%EC%A0%9C-%EC%83%81%ED%99%A9`
);
