export type Preset = Readonly<Record<string, Array<string>>>;
export type CheckPreset = (year: number, preset: Preset) => void;
