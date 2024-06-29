import { copyFileSync } from 'node:fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			fileName: 'index',
			formats: ['es', 'cjs'],
		},
		target: 'es2017',
	},
	plugins: [
		dts({
			rollupTypes: true,
			afterBuild: () => {
				// Reference https://github.com/qmhc/vite-plugin-dts/issues/267
				copyFileSync('dist/index.d.ts', 'dist/index.d.cts');
			},
		}),
	],
});
