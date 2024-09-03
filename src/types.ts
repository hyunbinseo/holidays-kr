export type Preset = Readonly<Record<string, ReadonlyArray<string> | undefined>>;
export type Presets = Partial<Record<string, Preset>>;
