import { ViteSetupModule } from './index';
import { router } from './router';
// Setup Pinia
// https://pinia.esm.dev/
export const install: ViteSetupModule = app => {
	const pinia = createPinia();
	pinia.use(({ store }) => {
		store.router = markRaw(router);
	});
	app.use(pinia);
};
