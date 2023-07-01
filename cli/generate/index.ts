import { writeFileSync } from 'node:fs';
import type { Year } from 'source';
import { y2022, y2023, y2024 } from 'source';
import { checkPreset } from './check-preset';
import { generateCsv } from './content-csv';
import { generateIcs, generateIcsEvents } from './content-ics';

const holidays = new Map([
	[2024, [y2024, 1687425345417]],
	[2023, [y2023, 1669289424786]],
	[2022, [y2022, 1669509606092]],
]) satisfies Map<number, [Year, number]>;

let cumulatedIcsEvents = '';
let cumulatedJsonEvents: string[] = [];

for (const [year, [preset, id]] of holidays) {
	checkPreset(preset, year);

	writeFileSync(`./public/${year}.csv`, generateCsv(preset));

	const icsEvents = generateIcsEvents(preset, id);
	writeFileSync(`./public/${year}.ics`, generateIcs(icsEvents));
	cumulatedIcsEvents = icsEvents + cumulatedIcsEvents;

	const jsonEvents = JSON.stringify(Object.fromEntries(preset), null, '\t');
	writeFileSync(`./public/${year}.json`, jsonEvents);
	cumulatedJsonEvents.push(`"${year}":${jsonEvents}`);
}

writeFileSync('./public/basic.ics', generateIcs(cumulatedIcsEvents));
writeFileSync('./public/basic.json', `{${cumulatedJsonEvents.join(',')}}`);

writeFileSync(
	'./public/_redirects',
	// FIXME: Temporary redirect due to Cloudflare Pages redirect error.
	// Reference https://github.com/hyunbinseo/holidays-kr/issues/7
	`# ${Date.now()}\n/ https://github.com/hyunbinseo/holidays-kr/blob/main/.github/README.md`
);
