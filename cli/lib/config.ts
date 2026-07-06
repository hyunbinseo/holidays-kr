import { join } from 'node:path';
import { root } from '#cli/lib/utilities.ts';

export const PUBLIC_DIR = join(root, './public');

export const HOLIDAYS_DIR = PUBLIC_DIR;
export const ANNIVERSARIES_DIR = join(PUBLIC_DIR, './anniversaries');
