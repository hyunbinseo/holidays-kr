module.exports = {
	/** @type {import('pm2-ecosystem').StartOptions[]} */
	apps: [
		{
			name: 'check-kasa-holidays',
			script: 'cli/check.mjs',
			time: true,
			autorestart: false,
			cron: '0,30 * * * *',
		},
	],
};
