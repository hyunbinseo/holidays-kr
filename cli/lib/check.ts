import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import type { ISODate, Preset, Presets } from '#src/types.ts';

export const checkHolidays = async (presets: Presets, opts?: { interactive?: boolean }) => {
	for (const [y2XXX, preset] of Object.entries(presets)) {
		const yyyy = y2XXX.slice(1);

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
			if (opts?.interactive) {
				const rl = createInterface({ input: stdin, output: stdout });
				const answer = await rl.question(`${message}. Skip? [y/N] `);
				rl.close();
				if (answer === 'y') continue;
			}
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
};
