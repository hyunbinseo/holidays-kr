// Object.freeze() does not deep freeze the object.
// Nested arrays can be altered using .push(), etc.
// LINK src/holidays/presets.ts
export type Preset = Readonly<
	Record<
		string,
		string[] // Cannot use [string, ...string[]] type.
	>
>;

export type CheckPreset = (year: number, preset: Preset) => void;
