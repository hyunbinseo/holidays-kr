import type { Preset } from '../types.ts';
import _y2018 from './2018.json' with { type: 'json' };
import _y2019 from './2019.json' with { type: 'json' };
import _y2020 from './2020.json' with { type: 'json' };
import _y2021 from './2021.json' with { type: 'json' };
import _y2022 from './2022.json' with { type: 'json' };
import _y2023 from './2023.json' with { type: 'json' };
import _y2024 from './2024.json' with { type: 'json' };
import _y2025 from './2025.json' with { type: 'json' };
import _y2026 from './2026.json' with { type: 'json' };

const toReadonly = <Json extends Preset>(json: Json) =>
	json as Readonly<Record<keyof Json, ReadonlyArray<string>>>;

export const y2018 = toReadonly(_y2018);
export const y2019 = toReadonly(_y2019);
export const y2020 = toReadonly(_y2020);
export const y2021 = toReadonly(_y2021);
export const y2022 = toReadonly(_y2022);
export const y2023 = toReadonly(_y2023);
export const y2024 = toReadonly(_y2024);
export const y2025 = toReadonly(_y2025);
export const y2026 = toReadonly(_y2026);
