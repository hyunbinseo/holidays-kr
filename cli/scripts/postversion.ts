import pkg from '../../package.json' with { type: 'json' };

const github = pkg.repository.url.replace(/^git\+|\.git$/g, '');

console.table({
	'New Tag': `${github}/releases/tag/v${pkg.version}`,
	'Create Release': `${github}/releases/new?tag=v${pkg.version}`,
});
