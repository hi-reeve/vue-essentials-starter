import { createRouter, createWebHistory } from 'vue-router/auto';

import { setupLayouts } from 'virtual:generated-layouts';

import { ViteSetupModule } from './index';
export const router = createRouter({
	extendRoutes(routes) {
		return setupLayouts(routes);
	},
	history: createWebHistory(),
});
export const install: ViteSetupModule = app => {
	app.use(router);
};
