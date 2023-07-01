module.exports = {
	apps: [
		{
			name: 'Check MSIT RSS',
			script: './cli/check.mjs',
			time: true,
			autorestart: false,
			cron_restart: '0 * * * *',
		},
	],
};
