import { copyFileSync, createWriteStream, globSync, mkdirSync, rmSync } from 'node:fs';

rmSync('./public', { recursive: true, force: true });
mkdirSync('./public/anniversaries', { recursive: true });

write(
	'대한민국의 공휴일',
	'./public',
	'./src/holidays/*.json',
	await import('./holidays/all.ts'),
	new Map([
		['y2022', 1669509606092],
		['y2023', 1669289424786],
		['y2024', 1687425345417],
		['y2025', 1719570756964],
	]),
);

write(
	'대한민국의 기념일',
	'./public/anniversaries',
	'./src/anniversaries/*.json',
	await import('./anniversaries/all.ts'),
	new Map([
		['y2022', 1694431396579],
		['y2023', 1694431397227],
		['y2024', 1694431397688],
		['y2025', 1719575527349],
	]),
);

/**
 * @param {string} calendarName
 * @param {string} outputDirectory
 * @param {string} copyFilesGlobPattern
 * @param {import('./types.ts').Presets} presets
 * @param {Map<string, number>} presetsUpdatedAt
 */
function write(calendarName, outputDirectory, copyFilesGlobPattern, presets, presetsUpdatedAt) {
	for (const path of globSync(copyFilesGlobPattern)) {
		const filename = path.substring(path.lastIndexOf('/') + 1);
		copyFileSync(path, `${outputDirectory}/${filename}`);
	}

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
		const updatedAt = presetsUpdatedAt.get(key);
		if (!updatedAt || !preset) throw new TypeError();

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
				const formattedDateString = dateString.replace(/-/g, '');
				const icsEvent =
					'BEGIN:VEVENT\n' +
					`DTSTART;VALUE=DATE:${formattedDateString}\n` +
					`DTSTAMP:${ics.dtStamp}\n` +
					`UID:${formattedDateString}-${updatedAt}\n` +
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
