import { createHash } from 'node:crypto';
import { createWriteStream, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { format } from 'oxfmt';
import { root } from '#cli/utilities.ts';
import type { ISODate, Preset, Presets } from '#src/types.ts';

export const PUBLIC_DIR = join(root, './public');

export const HOLIDAYS_DIR = PUBLIC_DIR;
export const ANNIVERSARIES_DIR = join(PUBLIC_DIR, './anniversaries');

export const write = async (
	calendarName: string,
	type: 'holidays' | 'anniversaries',
	presets: Presets,
) => {
	const baseDir = {
		holidays: HOLIDAYS_DIR,
		anniversaries: ANNIVERSARIES_DIR,
	}[type];

	for await (const [y2XXX, preset] of Object.entries(presets)) {
		const yyyy = y2XXX.slice(1);

		if (type === 'holidays') {
			const url = new URL(
				`/hyunbinseo/open-data/refs/heads/main/data/holidays/${yyyy}.json`,
				'https://raw.githubusercontent.com',
			);

			const response = await fetch(url);
			if (!response.ok) throw new Error(`${yyyy} error - HTTP ${response.status}`);

			const refPreset = (await response.json()) as Preset;
			const refDates = new Set(Object.keys(refPreset));
			const dates = new Set(Object.keys(preset));

			const dateDiff = dates.symmetricDifference(refDates);
			if (dateDiff.size !== 0) {
				const message = `${yyyy} mismatch - ${[...dateDiff].join(', ')}`;
				const rl = createInterface({ input: stdin, output: stdout });
				const answer = await rl.question(`${message}. Skip? [y/N] `);
				rl.close();
				if (answer === 'y') continue;
				throw new Error(message);
			}

			for (const date of dates as Set<ISODate>) {
				const refNames = refPreset[date];
				const refNameSet = new Set(refNames);
				if (!refNames) throw new Error(`${date} - no ref names`);
				if (refNames.length !== refNameSet.size) throw new Error(`${date} - ref name duplicates`);

				const names = preset[date];
				const nameSet = new Set(names);
				if (!names) throw new Error(`${date} - no local names`);
				if (names.length !== nameSet.size) throw new Error(`${date} - local name duplicates`);

				if (nameSet.size !== refNameSet.size) {
					throw new Error(`${date} mismatch - ${nameSet.size} vs ref ${refNameSet.size}`);
				}
			}
		}

		writeFileSync(
			join(baseDir, `${yyyy}.json`),
			(await format(`${yyyy}.json`, JSON.stringify(preset), { useTabs: true })).code,
		);
	}

	writeFileSync(
		join(baseDir, 'basic.json'),
		(await format('basic.json', JSON.stringify(presets).replaceAll('"y', '"'), { useTabs: true }))
			.code,
	);

	const ics = {
		header:
			'BEGIN:VCALENDAR\n' +
			'VERSION:2.0\n' +
			'PRODID:-//GitHub@hyunbinseo//holidays-kr//KO\n' +
			`X-WR-CALNAME:${calendarName}\n` +
			'X-WR-TIMEZONE:Asia/Seoul\n' +
			'X-WR-CALDESC:https://github.com/hyunbinseo/holidays-kr\n',
		dtStamp: new Date().toISOString().replace(/-|:/g, '').slice(0, 15) + 'Z',
	};

	const basicIcsStream = createWriteStream(join(baseDir, 'basic.ics'), 'utf8');
	basicIcsStream.write(ics.header);

	for (const [y2XXX, preset] of Object.entries(presets)) {
		const yyyy = y2XXX.slice(1);
		if (!preset) throw new TypeError();

		// CSV
		const csvStream = createWriteStream(join(baseDir, `${yyyy}.csv`), 'utf8');
		csvStream.write('\ufeff' + 'Start date,Subject\n');
		for (const [dateString, subjects] of Object.entries(preset)) {
			if (!subjects) throw new TypeError();
			for (const subject of subjects) {
				csvStream.write(`${dateString},${subject}\n`);
			}
		}
		csvStream.end();

		// ICS
		const icsStream = createWriteStream(join(baseDir, `${yyyy}.ics`), 'utf8');
		icsStream.write(ics.header);
		for (const [dateString, subjects] of Object.entries(preset)) {
			if (!subjects) throw new TypeError();
			for (const subject of subjects) {
				const yyyyMMdd = dateString.replaceAll('-', '');
				const hash = createHash('md5').update(subject).digest('hex');
				const icsEvent =
					'BEGIN:VEVENT\n' +
					`DTSTART;VALUE=DATE:${yyyyMMdd}\n` +
					`DTSTAMP:${ics.dtStamp}\n` +
					`UID:${yyyyMMdd}-${hash}\n` +
					`SUMMARY:${subject}\n` +
					'CLASS:PUBLIC\n' + // 공개
					'TRANSP:TRANSPARENT\n' + // !바쁨
					'END:VEVENT\n';
				icsStream.write(icsEvent);
				basicIcsStream.write(icsEvent);
			}
		}
		icsStream.write('END:VCALENDAR\n');
		icsStream.end();
	}

	basicIcsStream.write('END:VCALENDAR\n');
	basicIcsStream.end();
};
