import { writeFile } from 'node:fs/promises';
import ids from './input/ids.json' assert { type: 'json' };
import presets from './input/presets.json' assert { type: 'json' };
import { checkHolidays } from './script/checkHolidays.mjs';
import { generateCsv } from './script/generateCsv.mjs';
import { generateIcs, generateIcsEvents } from './script/generateIcs.mjs';

/** @type {string} */
const year = '2023';

const id = ids[year];
const preset = presets[year];

if (!id || typeof id !== 'number') throw new Error('Invalid ID format');
if (!preset || typeof preset !== 'object' || !Object.keys(preset).length) throw new Error('Invalid preset format');

for (const date of Object.keys(preset)) {
	const subject = preset[date];
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Invalid date format. ${date} should in YYYY-MM-DD format`);
	if (date.substring(0, 4) !== year) throw new Error(`Invalid date value. ${date} should be a date in year ${year}`);
	if (!subject || typeof subject !== 'string') throw new Error(`Invalid subject format. Subject of ${date} should be a truthy string`);
};

checkHolidays(preset, year);

await writeFile(`./output/${year}.csv`, generateCsv(preset));
await writeFile(`./output/${year}.ics`, generateIcs(generateIcsEvents(preset, id)));
