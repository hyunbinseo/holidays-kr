export type PresetKey = `${number}-${number}-${number}`; // yyyy-mm-dd

export type Preset = Readonly<Record<PresetKey, ReadonlyArray<string>>>;

export type Presets = Readonly<Record<`y${number}`, Preset>>;
