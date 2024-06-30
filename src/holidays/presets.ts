import _y2022 from './2022.json';
import _y2023 from './2023.json';
import _y2024 from './2024.json';
import _y2025 from './2025.json';

export const y2022 = Object.freeze(_y2022);
export const y2023 = Object.freeze(_y2023);
export const y2024 = Object.freeze(_y2024);
export const y2025 = Object.freeze(_y2025);

// Type checks are done in the index.js file.
// Re-export generates invalid index.d.ts file.

// Input: src/holidays/presets.ts
// export { default as y2022 } from './2022.json';

// Output: dist/index.d.ts
// import { default as y2022 } from './2022.json';
// Cannot find module './2022.json' or its corresponding type declarations.ts(2307)
