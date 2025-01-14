import { createHash } from 'node:crypto';
import {
	copyFileSync,
	createWriteStream,
	globSync,
	mkdirSync,
	rmSync,
	writeFileSync,
} from 'node:fs';
import * as anniversaries from './anniversaries/all.ts';
import * as holidays from './holidays/all.ts';
import type { Presets } from './types.ts';

rmSync('./public', { recursive: true, force: true });
mkdirSync('./public/anniversaries', { recursive: true });

write(
	'대한민국의 공휴일', //
	'./public',
	'./src/holidays/*.json',
	holidays,
);

write(
	'대한민국의 기념일', //
	'./public/anniversaries',
	'./src/anniversaries/*.json',
	anniversaries,
);

function write(
	calendarName: string,
	outputDirectory: string,
	copyFilesGlobPattern: string,
	presets: Presets,
) {
	for (const path of globSync(copyFilesGlobPattern)) {
		const filename = path.substring(path.lastIndexOf('/') + 1);
		copyFileSync(path, `${outputDirectory}/${filename}`);
	}

	writeFileSync(
		`${outputDirectory}/basic.json`,
		JSON.stringify(presets).replaceAll(/y(\d{4})/g, '$1'),
		'utf8',
	);

	const ics = {
		header:
			'BEGIN:VCALENDAR\n' +
			'VERSION:2.0\n' +
			'PRODID:-//GitHub@hyunbinseo//holidays-kr//KO\n' +
			`X-WR-CALNAME:${calendarName}\n` +
			'X-WR-TIMEZONE:Asia/Seoul\n' +
			'X-WR-CALDESC:https://github.com/hyunbinseo/holidays-kr\n',
		dtStamp: new Date().toISOString().replace(/-|:/g, '').substring(0, 15) + 'Z',
	};

	const basicIcsStream = createWriteStream(`${outputDirectory}/basic.ics`, 'utf8');
	basicIcsStream.write(ics.header);

	for (const [key, preset] of Object.entries(presets)) {
		const year = key.substring(1);
		if (!preset) throw new TypeError();

		// CSV
		const csvStream = createWriteStream(`${outputDirectory}/${year}.csv`, 'utf8');
		csvStream.write('\ufeff' + 'Start date,Subject\n');
		for (const [dateString, subjects] of Object.entries(preset)) {
			if (!subjects) throw new TypeError();
			for (const subject of subjects) {
				csvStream.write(`${dateString},${subject}\n`);
			}
		}
		csvStream.end();

		// ICS
		const icsStream = createWriteStream(`${outputDirectory}/${year}.ics`, 'utf8');
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
