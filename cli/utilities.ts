import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export const root = resolve(import.meta.dirname, '..');

if (!existsSync(resolve(root, 'package.json'))) throw new Error();
