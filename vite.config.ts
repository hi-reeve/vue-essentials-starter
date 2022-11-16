import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Components from 'unplugin-vue-components/vite';
import {
	HeadlessUiResolver,
	VueUseComponentsResolver,
} from 'unplugin-vue-components/resolvers';
import eslintPlugin from 'vite-plugin-eslint';
import Layouts from 'vite-plugin-vue-layouts';
import vueJSX from '@vitejs/plugin-vue-jsx';
import VueTypeImports from 'vite-plugin-vue-type-imports';
import AutoImport from 'unplugin-auto-import/vite';
import viteCompression from 'vite-plugin-compression';
import VueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import { ViteDevServer } from 'vite';
/**
 * Vite doesn't handle fallback html with dot (.), see https://github.com/vitejs/vite/issues/2415
 * @returns {import('vite').Plugin}
 */
function spaFallbackWithDot() {
	return {
		name: 'spa-fallback-with-dot',
		configureServer(server: ViteDevServer) {
			return () => {
				server.middlewares.use(function customSpaFallback(
					req,
					res,
					next,
				) {
					if (!req.url) return next();

					if (req.url.includes('.') && !req.url.endsWith('.html')) {
						req.url = '/index.html';
					}
					next();
				});
			};
		},
	};
}

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
	},
	server: {
		proxy: {
			'/api': {
				target: 'https://dev-api.nathos.care/',
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace(/^\/api/, ''),
			},
			'/google': {
				target: 'https://www.googleapis.com/',
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace(/^\/google/, ''),
			},
		},
		port: 3000,
	},
	plugins: [
		spaFallbackWithDot(),
		viteCompression(),
		vue(),
		vueJSX(),
		VueTypeImports(),
		eslintPlugin({}),
		AutoImport({
			imports: [
				'vue',
				'@vueuse/core',
				'@vueuse/head',
				'pinia',
				VueRouterAutoImports,
				{
					axios: [
						// default imports
						['default', 'axios'], // import { default as axios } from 'axios',
					],
					'@tanstack/vue-query': [
						'useMutation',
						'useQuery',
						'useQueryProvider',
					],
				},
			],
			eslintrc: {
				enabled: true,
				filepath: './.eslintrc-auto-import.json',
				globalsPropValue: true,
			},
			dirs: [
				'./src/composable/**',
				'./src/store/**',
				'./src/components/**/use*.ts',
			],
		}),
		Components({
			dts: true,
			resolvers: [
				IconsResolver({
					prefix: 'icon',
					customCollections: ['nh-icons'],
				}),
				HeadlessUiResolver({ prefix: '' }),
				VueUseComponentsResolver(),
			],
			types: [
				{
					from: '@vuepic/vue-datepicker',
					names: ['DatePicker'],
				},
			],
			extensions: ['vue', 'tsx'],
		}),
		Icons({
			compiler: 'vue3',
			customCollections: {
				'nh-icons': FileSystemIconLoader('./src/assets/icons'),
			},
		}),
		Layouts(),
		VueRouter({
			dts: true,
			extensions: ['vue', 'tsx', 'jsx', 'ts', 'js'],
		}),
	],

	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'vue-easy-lightbox':
				'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js',
		},
	},
});
