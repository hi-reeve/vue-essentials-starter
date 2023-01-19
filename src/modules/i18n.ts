import { ViteSetupModule } from './index';
import { createI18n } from 'vue-i18n';

export const SUPPORT_LOCALES = ['en', 'id'];

const messages: Record<string, {}> = {};
Object.entries(
	import.meta.glob<{ default: any }>('../locales/**/*.{y(a)?ml,json}', {
		eager: true,
	}),
).forEach(([key, value]) => {
	const isYamlOrJson = key.endsWith('.yaml') || key.endsWith('.json');
	const langKey = key.split('/')[2];
	if (isYamlOrJson) {
		messages[langKey] = {
			...messages[langKey],
			...value.default,
		};
	}
});

export const setupI18n = () => {
	const options = {
		legacy: false,
		locale: 'id',
		messages,
	};
	const i18n = createI18n(options);

	return i18n;
};

export const install: ViteSetupModule = app => {
	app.use(setupI18n());
};
