import { writeFile } from 'node:fs/promises';
import ids from './input/ids.json' assert { type: 'json' };
import presets from './input/presets.json' assert { type: 'json' };
import { checkHolidays } from './script/checkHolidays.mjs';
import { generateCsv } from './script/generateCsv.mjs';
import { generateIcs, generateIcsEvents } from './script/generateIcs.mjs';

/** @type {number} */
const year = 2023;

const id = ids[year];
if (!id || typeof id !== 'number' || id.toString().length !== 13)
	throw new Error('Invalid ID format. Use a value returned by Date.now()');

const preset = presets[year];
checkHolidays({ preset, year });

await writeFile(`./output/${year}.csv`, generateCsv(preset));
await writeFile(`./output/${year}.ics`, generateIcs(generateIcsEvents({ preset, id })));
