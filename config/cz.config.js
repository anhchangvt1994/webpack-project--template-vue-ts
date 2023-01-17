module.exports = {
	skipQuestions: ['footerPrefix', 'footer', 'confirmCommit'],
	types: [
		{
			description: "If you don't know the type will select",
			emoji: '🤷',
			value: 'chore',
		},
		{
			description: 'Improve perfomance',
			emoji: '⚡️',
			value: 'perf',
		},
		{
			description: 'Create a release commit',
			emoji: '🎯',
			value: 'release',
		},
		{
			description: ' Create / change some document files (ex: *.docs, *.md)',
			emoji: '🗒',
			value: ' docs',
		},
		{
			description: 'Add / change a test',
			emoji: '🔬',
			value: 'test',
		},
		{
			description: 'Only style for layout',
			emoji: '🎨',
			value: 'style',
		},
		{
			description: 'Fix a bug',
			emoji: '🐞',
			value: 'fix',
		},
		{
			description: 'Create a new feature',
			emoji: '🧩',
			value: 'feat',
		},
		{
			description: 'Update but not improve performance',
			emoji: '🧩',
			value: 'update',
		},
	],
	scopes: [
		'page',
		'comp-page',
		'comp-glob',
		'lib',
		'util',
		'enum',
		'define',
		'server',
		'other',
	],
	messages: {
		type: 'Select the type of committing:',
		customScope: 'Select the scope this component affects:',
		subject: 'Title:\n',
		body: 'Description:\n',
		breaking: 'List any breaking changes:\n',
		footer: 'Issues this commit closes, e.g #123:',
		confirmCommit: 'Ready to commit ?\n',
	},
}
