import _y2022 from './2022.json' assert { type: 'json' };
import _y2023 from './2023.json' assert { type: 'json' };
import _y2024 from './2024.json' assert { type: 'json' };
import _y2025 from './2025.json' assert { type: 'json' };

export const y2022 = Object.freeze(_y2022);
export const y2023 = Object.freeze(_y2023);
export const y2024 = Object.freeze(_y2024);
export const y2025 = Object.freeze(_y2025);

// TODO Replace `assert` to `with` in JSON imports.
// esbenp.prettier-vscode@10.4.0 does not support it.
// Reference https://github.com/nodejs/node/pull/50141

// Direct JSON re-export generates invalid .d.ts file.
// e.g. export { default as y2022 } from './2022.json';
