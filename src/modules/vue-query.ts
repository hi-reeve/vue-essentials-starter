import { ViteSetupModule } from './index';
import { VueQueryPlugin } from '@tanstack/vue-query';
export const install: ViteSetupModule = app => {
	app.use(VueQueryPlugin);
};
