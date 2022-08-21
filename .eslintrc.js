module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'prettier',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'airbnb-base',
		'airbnb-typescript/base',
	],
	plugins: ['@typescript-eslint', 'prettier'],
	parserOptions: {
		project: './tsconfig.json',
	},
	rules: {
		'prettier/prettier': 'error',
		'@typescript-eslint/indent': ['error', 'tab'],
		'no-tabs': 'off',
		'max-len': 'off',
	},
};
