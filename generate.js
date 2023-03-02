import { writeFileSync } from 'node:fs';
import { y2022, y2023 } from './index.js';
import { checkHolidays } from './scripts/check-holidays.js';
import { generateCsv } from './scripts/generate-csv.js';
import { generateIcs, generateIcsEvents } from './scripts/generate-ics.js';

/** @type Object.<number, [Object<string, string>,number]> */
const holidays = {
	2023: [y2023, 1669289424786],
	2022: [y2022, 1669509606092],
};

let cumulatedIcsEvents = '';

for (const [year, [preset, id]] of Object.entries(holidays)) {
	if (!/^2\d{3}$/.test(year)) throw new Error(`Invalid year format - ${year}`);

	if (!id || typeof id !== 'number' || id.toString().length !== 13)
		throw new Error(`Invalid ID format - ${year}, ${id}`);

	checkHolidays(preset, year);

	const icsEvents = generateIcsEvents(preset, id);

	cumulatedIcsEvents += icsEvents;

	writeFileSync(`./public/${year}.csv`, generateCsv(preset));
	writeFileSync(`./public/${year}.ics`, generateIcs(icsEvents));
}

writeFileSync('./public/basic.ics', generateIcs(cumulatedIcsEvents));
writeFileSync(
	'./public/_redirects',
	`# ${Date.now()}\n/ https://github.com/hyunbinseo/holidays-kr#%EB%AC%B8%EC%A0%9C-%EC%83%81%ED%99%A9`
);
