// Object.freeze() does not deep freeze the object.
// Nested arrays can be altered using .push(), etc.
// LINK src/holidays/presets.js

export type Preset = Readonly<Record<string, string[] | undefined>>;
export type Presets = Record<string, Preset | undefined>;

export type CheckPreset = (year: number, preset: Preset) => void;
