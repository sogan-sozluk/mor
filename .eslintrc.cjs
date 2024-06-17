/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	rules: {
		quotes: ['error', 'single'],
		'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1, maxEOF: 1 }],
		'no-console': ['warn', { allow: ['warn', 'error'] }],
		'no-inline-comments': 'error',
		'no-trailing-spaces': 'error'
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	]
};
