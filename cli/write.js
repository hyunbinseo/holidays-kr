import { copyFileSync, createWriteStream, globSync, mkdirSync, rmSync } from 'node:fs';

rmSync('./public', { recursive: true, force: true });
mkdirSync('./public/anniversaries', { recursive: true });

write(
	'대한민국의 공휴일',
	'./public',
	'./src/holidays/*.json',
	await import('../src/holidays/all.ts'),
);

write(
	'대한민국의 기념일',
	'./public/anniversaries',
	'./src/anniversaries/*.json',
	await import('../src/anniversaries/all.ts'),
);

/**
 * @param {string} calendarName
 * @param {string} outputDirectory
 * @param {string} copyFilesGlobPattern
 * @param {import('../src/types.ts').Presets} presets
 */
function write(calendarName, outputDirectory, copyFilesGlobPattern, presets) {
	for (const path of globSync(copyFilesGlobPattern)) {
		const filename = path.substring(path.lastIndexOf('/') + 1);
		copyFileSync(path, `${outputDirectory}/${filename}`);
	}

	for (const [key, preset] of Object.entries(presets)) {
		if (!preset) throw new TypeError();
		const year = key.substring(1);

		const csvStream = createWriteStream(`${outputDirectory}/${year}.csv`, 'utf8');
		csvStream.write('\ufeff' + 'Start date,Subject\n');
		for (const [dateString, subjects] of Object.entries(preset)) {
			if (!subjects) throw new TypeError();
			for (const subject of subjects) {
				csvStream.write(`${dateString},${subject}\n`);
			}
		}
		csvStream.end();
	}
}
