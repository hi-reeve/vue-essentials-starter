import { ViteSetupModule } from '.';
import Toast, { PluginOptions, POSITION, TYPE } from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';
import IconClose from '~icons/ion/close';
export const install: ViteSetupModule = app => {
	const options: PluginOptions = {
		position: POSITION.TOP_CENTER,
		shareAppContext: true,
		hideProgressBar: true,
		draggable: false,
		transition: 'Vue-Toastification__bounce',
		closeButton: false,
		toastDefaults: {
			[TYPE.ERROR]: {
				icon: IconClose,
			},
		},
	};
	app.use(Toast, options);
};
