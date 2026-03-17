import { defineConfig } from 'tsdown';

export default defineConfig({
	format: ['esm'],
	platform: 'neutral',
	exports: true,
	publint: true,
	attw: { profile: 'esm-only' },
	globImport: true,
});
