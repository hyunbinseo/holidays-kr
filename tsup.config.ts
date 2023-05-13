import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: true,
	format: ['cjs', 'esm'],
	entry: ['index.ts', 'check.ts'],
	outDir: 'dist',
});
