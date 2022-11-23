import { writeFile } from 'node:fs/promises';
import holidays from './data/2023.json' assert { type: 'json' };

const year = 2023;

const holidayArray = Object.entries(holidays);

holidayArray.forEach(([date, subject]) => {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Incorrect date format');
	if (typeof subject !== 'string') throw new Error('Incorrect subject format');
	if (!subject) throw new Error('Subject should not be empty');
});

const csvLines = holidayArray.map(([date, subject]) => (`${subject},${date}`));

await writeFile(`./data/${year}.csv`, '\ufeff' + ['Subject,Start date', ...csvLines].join('\n'));
