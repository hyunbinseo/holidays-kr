export type Preset = Readonly<Record<string, ReadonlyArray<string>>>;
export type CheckPreset = (year: number, preset: Preset) => void;
