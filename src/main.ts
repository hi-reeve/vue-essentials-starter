import { createApp } from 'vue';

import App from './App.vue';

import './assets/main.scss';
import { ViteSetupModule } from './modules';

const app = createApp(App);

Object.values(
	import.meta.glob<{ install: ViteSetupModule }>('./modules/*.ts', {
		eager: true,
	}),
).forEach(i => i.install?.(app));

app.mount('#app');
