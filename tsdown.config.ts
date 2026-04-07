import { defineConfig } from 'tsdown';

export default defineConfig({
	dts: true,
	format: ['esm'],
	platform: 'neutral',
	exports: true,
	publint: true,
	attw: { profile: 'esm-only' },
	globImport: true,
});
