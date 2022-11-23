import { writeFile } from 'node:fs/promises';
import holidays from './data/2023.json' assert { type: 'json' };

const year = 2023;

for (const date in holidays) {
	const subject = holidays[date];
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Incorrect date format');
	if (typeof subject !== 'string') throw new Error('Incorrect subject format');
	if (!subject) throw new Error('Subject should not be empty');
};

await writeFile(`./data/${year}.csv`,
	'\ufeff' // BOM 
	+ 'Start date,Subject\n'
	+ JSON.stringify(holidays)
		.replaceAll('","', '\n')
		.replaceAll('":"', ',')
		.replaceAll(/{"|"}/g, ''),
);
