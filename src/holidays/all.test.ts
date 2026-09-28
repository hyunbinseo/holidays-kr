import { assert, describe, expect, it } from 'vitest';
import type { ISODate, Presets } from '../types.ts';
import * as holidays from './all.ts';
import { lunarHolidays, solarHolidays } from './rules.ts';

const election = /^(?:제\d+대 ?)?(?:대통령|국회의원|전국동시지방)선거$/;

describe.each(Object.entries(holidays satisfies Presets as Presets))('%s', (y2XXX, preset) => {
	const year = Number(y2XXX.slice(1));
	const dates = Object.keys(preset) as ISODate[];

	const findDates = (name: string) => dates.filter((date) => preset[date]?.includes(name));

	const solarHolidaysOfYear = solarHolidays.filter(({ since = 0 }) => year >= since);

	it('has valid dates within the year, sorted', () => {
		for (const date of dates) {
			expect(Temporal.PlainDate.from(date).toString()).toBe(date);
			expect(date.startsWith(`${year}-`)).toBe(true);
		}
		expect(dates).toEqual([...dates].sort());
	});

	it('has unique names', () => {
		const names = Object.values(preset).flat();
		expect([...new Set(names)]).toEqual(names);
	});

	it('has well-formed names', () => {
		for (const names of Object.values(preset)) {
			expect(names.length).toBeGreaterThan(0);
			for (const name of names) expect(name).toMatch(/^[0-9가-힣ㆍ()]+(?: [0-9가-힣ㆍ()]+)*$/);
		}
	});

	it('has known names only', () => {
		const known = new Set([
			...solarHolidaysOfYear.map(({ name }) => name),
			...lunarHolidays.flatMap(({ name, names = [name] }) => names),
			...[...solarHolidaysOfYear, ...lunarHolidays].map(({ name }) => `대체공휴일(${name})`),
		]);
		for (const name of Object.values(preset).flat()) {
			if (known.has(name)) continue;
			if (election.test(name)) continue;
			if (/^임시공휴일(?:\(.+\))?$/.test(name)) continue;
			expect.unreachable(`Unknown name: ${name}`);
		}
	});

	it('has 대체공휴일, 임시공휴일, and elections on weekdays', () => {
		for (const [date, names] of Object.entries(preset)) {
			if (names.every((name) => /^(?:대체|임시)공휴일/.test(name) || election.test(name))) {
				expect(Temporal.PlainDate.from(date).dayOfWeek).toBeLessThan(6);
			}
		}
	});

	it('has 대체공휴일 on the first non-holiday weekday after the holiday', () => {
		const entries = Object.entries(preset).flatMap(([date, names]) =>
			names.map((name) => ({ date, name })),
		);

		for (const { date, name } of entries) {
			const source = /^대체공휴일\((.+)\)$/.exec(name)?.[1];
			if (!source) continue;

			const [sourceDate] = findDates(source);
			assert(sourceDate && sourceDate < date);

			let day = Temporal.PlainDate.from(sourceDate).add({ days: 1 });
			while (day.toString() < date) {
				expect(day.dayOfWeek >= 6 || day.toString() in preset, day.toString()).toBe(true);
				day = day.add({ days: 1 });
			}
		}
	});

	it.each(solarHolidaysOfYear)('has $name on $month/$day', ({ month, day, name }) => {
		const date = Temporal.PlainDate.from({ year, month, day }).toString() as ISODate;
		expect(preset[date]).toContain(name);
	});

	it.each(lunarHolidays)(
		'has $name on the lunar $month/$day, with consecutive days',
		({ name, names = [name], month, day }) => {
			expect(names).toContain(name);
			const [date] = findDates(name);
			assert(date);

			const solar = Temporal.PlainDate.from(date);
			const lunar = solar.withCalendar('dangi');

			expect(lunar.monthCode).toBe(`M${String(month).padStart(2, '0')}`);
			expect(lunar.day).toBe(day);

			const first = solar.subtract({ days: names.indexOf(name) });
			for (const [i, name] of names.entries()) {
				expect(preset[first.add({ days: i }).toString() as ISODate]).toContain(name);
			}
		},
	);
});
