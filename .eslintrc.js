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
		'object-curly-newline': 'off',
		'no-dupe-class-members': 'off',
		'implicit-arrow-linebreak': 'off',
		'@typescript-eslint/no-dupe-class-members': 'warn',
		'@typescript-eslint/lines-between-class-members': [
			'error',
			{
				exceptAfterOverload: true,
			},
		],
	},
};
