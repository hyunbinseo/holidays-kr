import { mkdirSync, rmSync } from 'node:fs';
import { ANNIVERSARIES_DIR, PUBLIC_DIR } from './index.ts';

rmSync(PUBLIC_DIR, { recursive: true, force: true });
mkdirSync(ANNIVERSARIES_DIR, { recursive: true });

await import('./holidays.ts');
await import('./anniversaries.ts');
