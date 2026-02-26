import { createHash } from 'node:crypto';
import { createWriteStream, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as prettier from 'prettier';
import * as anniversaries from './anniversaries.ts';
import * as holidays from './holidays.ts';
import type { Presets } from './types.ts';

const rootDir = join(import.meta.dirname, '..');
if (!existsSync(join(rootDir, 'package.json'))) throw new Error();

rmSync(join(rootDir, './public'), { recursive: true, force: true });
mkdirSync(join(rootDir, './public/anniversaries'), { recursive: true });

write('대한민국의 공휴일', 'holidays', holidays);
write('대한민국의 기념일', 'anniversaries', anniversaries);

async function write(calendarName: string, type: 'holidays' | 'anniversaries', presets: Presets) {
	const baseDir =
		type === 'holidays' //
			? join(rootDir, './public')
			: join(rootDir, './public/anniversaries');

	for await (const [key, value] of Object.entries(presets)) {
		writeFileSync(
			join(baseDir, `${key.slice(1)}.json`),
			await prettier.format(JSON.stringify(value), {
				parser: 'json',
				useTabs: true,
			}),
		);
	}

	writeFileSync(
		join(baseDir, 'basic.json'),
		await prettier.format(JSON.stringify(presets).replaceAll(/y(\d{4})/g, '$1'), {
			parser: 'json',
			useTabs: true,
		}),
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

	for (const [key, preset] of Object.entries(presets)) {
		const year = key.slice(1);
		if (!preset) throw new TypeError();

		// CSV
		const csvStream = createWriteStream(join(baseDir, `${year}.csv`), 'utf8');
		csvStream.write('\ufeff' + 'Start date,Subject\n');
		for (const [dateString, subjects] of Object.entries(preset)) {
			if (!subjects) throw new TypeError();
			for (const subject of subjects) {
				csvStream.write(`${dateString},${subject}\n`);
			}
		}
		csvStream.end();

		// ICS
		const icsStream = createWriteStream(join(baseDir, `${year}.ics`), 'utf8');
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
