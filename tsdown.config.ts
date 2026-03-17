import { defineConfig } from 'tsdown';

export default defineConfig({
	format: ['cjs', 'esm'],
	platform: 'neutral',
	exports: true,
	publint: true,
	attw: true,
	globImport: true,
});
