/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,

	plugins: ['@typescript-eslint', 'vuejs-accessibility'],
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier',
		'prettier',
		'./.eslintrc-auto-import.json',
		'plugin:vuejs-accessibility/recommended',
	],
	rules: {
		'vue/multi-word-component-names': ['off'],
	},
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	env: { node: true },
	globals: {
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefaults: 'readonly',
	},
	ignorePatterns: [
		'node_modules',
		'public',
		'.vscode',
		'*.d.ts',
		'.estlintrc-auto-import.json',
	],
};
