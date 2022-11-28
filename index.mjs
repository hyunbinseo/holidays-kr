import { writeFileSync } from 'node:fs';
import ids from './input/ids.json' assert { type: 'json' };
import presets from './input/presets.json' assert { type: 'json' };
import { checkHolidays } from './script/checkHolidays.mjs';
import { generateCsv } from './script/generateCsv.mjs';
import { generateIcs, generateIcsEvents } from './script/generateIcs.mjs';

const years = Object.keys(presets).map((year) => {
	if (!/^2\d{3}$/.test(year)) throw new Error('Invalid year format');
	return Number(year);
});

const minYear = Math.min(...years);
const maxYear = Math.max(...years);

let cumulatedIcsEvents = '';

for (let year = minYear; year <= maxYear; year += 1) {
	const id = ids[year];
	if (!id || typeof id !== 'number' || id.toString().length !== 13)
		throw new Error('Invalid ID format. Use a value returned by Date.now()');

	const preset = presets[year];
	checkHolidays({ preset, year });

	const icsEvents = generateIcsEvents({ preset, id });
	cumulatedIcsEvents += icsEvents;

	if (year === maxYear) {
		writeFileSync(`./public/${year}.csv`, generateCsv(preset));
		writeFileSync(`./public/${year}.ics`, generateIcs(icsEvents));
		writeFileSync('./public/basic.ics', generateIcs(cumulatedIcsEvents));
	};
};
