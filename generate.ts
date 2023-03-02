import { writeFileSync } from 'node:fs';
import type { Year } from './index.js';
import { y2022, y2023 } from './index.js';
import { checkHolidays } from './scripts/check-holidays';
import { generateCsv } from './scripts/generate-csv';
import { generateIcs, generateIcsEvents } from './scripts/generate-ics';

const holidays = new Map([
	[2023, [y2023, 1669289424786]],
	[2022, [y2022, 1669509606092]],
]) satisfies Map<number, [Year, number]>;

let cumulatedIcsEvents = '';

for (const [year, [preset, id]] of holidays) {
	checkHolidays(preset, year);

	writeFileSync(`./public/${year}.csv`, generateCsv(preset));

	const icsEvents = generateIcsEvents(preset, id);
	writeFileSync(`./public/${year}.ics`, generateIcs(icsEvents));
	cumulatedIcsEvents = icsEvents + cumulatedIcsEvents;
}

writeFileSync('./public/basic.ics', generateIcs(cumulatedIcsEvents));

writeFileSync(
	'./public/basic.json',
	JSON.stringify(
		[...holidays.entries()].reduce(
			(acc, [year, [preset]]) => ({
				...acc,
				[year]: Object.fromEntries(preset),
			}),
			{}
		)
	)
);

writeFileSync(
	'./public/_redirects',
	`# ${Date.now()}\n/ https://github.com/hyunbinseo/holidays-kr#%EB%AC%B8%EC%A0%9C-%EC%83%81%ED%99%A9`
);
