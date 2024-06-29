export type Preset = Readonly<Record<string, ReadonlyArray<string>>>;

export type YearlyPresets = ReadonlyMap<number, [Preset, number]>;

export type CheckPreset = (year: number, preset: Preset) => void;
