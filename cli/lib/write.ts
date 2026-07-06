import { createHash } from 'node:crypto';
import { createWriteStream, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { format } from 'oxfmt';
import type { Presets } from '#src/types.ts';

export const write = async (opts: { presets: Presets; baseDir: string; calendarName: string }) => {
	for (const [y2XXX, preset] of Object.entries(opts.presets)) {
		const yyyy = y2XXX.slice(1);

		writeFileSync(
			join(opts.baseDir, `${yyyy}.json`),
			(await format(`${yyyy}.json`, JSON.stringify(preset), { useTabs: true })).code,
		);
	}

	const json = JSON.stringify(opts.presets).replaceAll('"y', '"');

	writeFileSync(
		join(opts.baseDir, 'basic.json'),
		(await format('basic.json', json, { useTabs: true })).code,
	);

	const ics = {
		header:
			'BEGIN:VCALENDAR\n' +
			'VERSION:2.0\n' +
			'PRODID:-//GitHub@hyunbinseo//holidays-kr//KO\n' +
			`X-WR-CALNAME:${opts.calendarName}\n` +
			'X-WR-TIMEZONE:Asia/Seoul\n' +
			'X-WR-CALDESC:https://github.com/hyunbinseo/holidays-kr\n',
		dtStamp: new Date().toISOString().replace(/-|:/g, '').slice(0, 15) + 'Z',
	};

	const basicIcsStream = createWriteStream(join(opts.baseDir, 'basic.ics'), 'utf8');
	basicIcsStream.write(ics.header);

	for (const [y2XXX, preset] of Object.entries(opts.presets)) {
		const yyyy = y2XXX.slice(1);
		if (!preset) throw new TypeError();

		// CSV
		const csvStream = createWriteStream(join(opts.baseDir, `${yyyy}.csv`), 'utf8');
		csvStream.write('\ufeff' + 'Start date,Subject\n');
		for (const [dateString, subjects] of Object.entries(preset)) {
			if (!subjects) throw new TypeError();
			for (const subject of subjects) {
				csvStream.write(`${dateString},${subject}\n`);
			}
		}
		csvStream.end();

		// ICS
		const icsStream = createWriteStream(join(opts.baseDir, `${yyyy}.ics`), 'utf8');
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
