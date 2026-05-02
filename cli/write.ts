import { createHash } from 'node:crypto';
import { createWriteStream, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { env } from 'node:process';
import { format } from 'oxfmt';
import * as anniversaries from '#src/anniversaries.ts';
import * as holidays from '#src/holidays/all.ts';
import type { ISODate, Preset, Presets } from '#src/types.ts';

const rootDir = join(import.meta.dirname, '..');
if (!existsSync(join(rootDir, 'package.json'))) throw new Error();

rmSync(join(rootDir, './public'), { recursive: true, force: true });
mkdirSync(join(rootDir, './public/anniversaries'), { recursive: true });

await write('대한민국의 공휴일', 'holidays', holidays);
await write('대한민국의 기념일', 'anniversaries', anniversaries);

async function write(calendarName: string, type: 'holidays' | 'anniversaries', presets: Presets) {
	const baseDir =
		type === 'holidays' //
			? join(rootDir, './public')
			: join(rootDir, './public/anniversaries');

	for await (const [y2XXX, preset] of Object.entries(presets)) {
		const yyyy = y2XXX.slice(1);

		if (type === 'holidays' && env['SKIP_API_CHECK'] !== 'TRUE') {
			const response = await fetch(
				new URL(
					`/hyunbinseo/open-data/refs/heads/main/data/holidays/${yyyy}.json`,
					'https://raw.githubusercontent.com',
				),
			);

			if (!response.ok) throw new Error(yyyy);

			const _preset = (await response.json()) as Preset;
			const _dates = new Set(Object.keys(_preset));
			const dates = new Set(Object.keys(preset));
			if (dates.symmetricDifference(_dates).size !== 0) throw new Error(yyyy);

			for (const date of dates) {
				const yyyy_mm_dd = date as ISODate;
				const names = preset[yyyy_mm_dd];
				const _names = _preset[yyyy_mm_dd];
				if (names?.length !== _names?.length) throw new Error(date);
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
}
