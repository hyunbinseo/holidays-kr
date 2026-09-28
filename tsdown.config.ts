import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		all: 'src/holidays/all.ts',
	},
	dts: true,
	format: ['esm'],
	target: 'es2022', // sync with tsconfig.lib.json's lib
	platform: 'neutral',
	exports: true,
	publint: true,
	attw: { profile: 'esm-only' },
	globImport: true,
});
