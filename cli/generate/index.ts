import { writeFileSync } from 'node:fs';
import { y2022, y2023, y2024 } from 'source';
import { y2022a, y2023a, y2024a } from 'source/anniversaries';
import { writeFiles } from './write-files';

writeFiles(
	'holiday',
	new Map([
		[2024, [y2024, 1687425345417]],
		[2023, [y2023, 1669289424786]],
		[2022, [y2022, 1669509606092]],
	]),
);

writeFiles(
	'anniversaries',
	new Map([
		[2024, [y2024a, 1694431397688]],
		[2023, [y2023a, 1694431397227]],
		[2022, [y2022a, 1694431396579]],
	]),
);

writeFileSync(
	'./public/_redirects',
	// FIXME: Temporary redirect due to Cloudflare Pages redirect error.
	// Reference https://github.com/hyunbinseo/holidays-kr/issues/7
	`# ${Date.now()}\n/ https://github.com/hyunbinseo/holidays-kr/blob/main/.github/README.md`,
);
