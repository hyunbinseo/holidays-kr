import { writeFileSync } from 'node:fs';
import { checkHolidays } from './scripts/check-holidays.js';
import { generateCsv } from './scripts/generate-csv.js';
import { generateIcs, generateIcsEvents } from './scripts/generate-ics.js';
import ids from './source/ids.json' assert { type: 'json' };
import presets from './source/presets.js';

let cumulatedIcsEvents = '';

for (const year of Object.keys(presets)) {
	if (!/^2\d{3}$/.test(year)) throw new Error('Invalid year format');
}

for (const [year, preset] of Object.entries(presets)) {
	const id = ids[year];

	if (!id || typeof id !== 'number' || id.toString().length !== 13)
		throw new Error('Invalid ID format. Use a value returned by Date.now()');

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
