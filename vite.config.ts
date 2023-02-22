import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
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

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

import DefineOptions from 'unplugin-vue-define-options/vite';
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
	plugins: [
		spaFallbackWithDot(),
		viteCompression(),
		VueRouter({
			dts: true,
			extensions: ['.vue', '.tsx', '.jsx', '.ts', '.js'],
		}),
		DefineOptions(),
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
				'vue-i18n',
				'vitest',
				'vee-validate',

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
					zod: ['z'],
					yup: [
						'object',
						'string',
						'number',
						'array',
						'mixed',
						'date',
						'boolean',
						'setLocale',
						['lazy', 'yupLazy'],
						['ref', 'yupRef'],
					],
					'vue-toastification': ['useToast'],
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
				}),
				HeadlessUiResolver({ prefix: '' }),
				VueUseComponentsResolver(),
				componentName => {
					if (
						componentName === 'Motion' ||
						componentName === 'Presence'
					) {
						return { name: componentName, from: 'motion/vue' };
					}
				},
			],
			types: [
				{
					from: '@vuepic/vue-datepicker',
					names: ['DatePicker'],
				},
			],
			extensions: ['.vue', '.tsx'],
		}),
		Icons({
			compiler: 'vue3',
		}),
		Layouts(),
		VueI18nPlugin({
			runtimeOnly: true,
			compositionOnly: true,
			include: resolve(__dirname, './src/locales/**/*.{y(a)?ml,json}'),
		}),
	],

	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
});
