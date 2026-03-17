export type ISODate = `${number}-${number}-${number}`; // yyyy-mm-dd

export type Preset = Readonly<Record<ISODate, ReadonlyArray<string>>>;

export type Presets = Readonly<Record<`y${number}`, Preset>>;
