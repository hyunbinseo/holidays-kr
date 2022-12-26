import { writeFileSync } from 'node:fs';
import ids from './input/ids.json' assert { type: 'json' };
import presets from './input/presets.json' assert { type: 'json' };
import redirects from './input/redirects.json' assert { type: 'json' };
import { checkHolidays } from './script/checkHolidays.mjs';
import { generateCsv } from './script/generateCsv.mjs';
import { generateIcs, generateIcsEvents } from './script/generateIcs.mjs';

let cumulatedIcsEvents = '';

for (const year of Object.keys(presets)) {
	if (!/^2\d{3}$/.test(year)) throw new Error('Invalid year format');
};

for (const [year, preset] of Object.entries(presets)) {
	const id = ids[year];

	if (!id || typeof id !== 'number' || id.toString().length !== 13)
		throw new Error('Invalid ID format. Use a value returned by Date.now()');

	checkHolidays(preset, year);

	const icsEvents = generateIcsEvents(preset, id);

	cumulatedIcsEvents += icsEvents;

	writeFileSync(`./public/${year}.csv`, generateCsv(preset));
	writeFileSync(`./public/${year}.ics`, generateIcs(icsEvents));
};

writeFileSync('./public/basic.ics', generateIcs(cumulatedIcsEvents));

const _redirects = Object.entries(redirects).reduce((acc, [key, value]) => (`${acc}${key} ${value}\n`), `# ${Date.now()}\n`);

writeFileSync(`./public/_redirects`, _redirects);
