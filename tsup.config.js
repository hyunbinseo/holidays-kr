import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.js'],
	format: ['cjs', 'esm'],
	dts: true,
	clean: true,
});
