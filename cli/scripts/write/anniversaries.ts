import { ANNIVERSARIES_DIR } from '#cli/lib/config.ts';
import { write } from '#cli/lib/write.ts';
import * as anniversaries from '#src/anniversaries.ts';

await write({
	presets: anniversaries,
	baseDir: ANNIVERSARIES_DIR,
	calendarName: '대한민국의 기념일',
});
