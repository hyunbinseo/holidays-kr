import { checkHolidays } from '#cli/lib/check.ts';
import { HOLIDAYS_DIR } from '#cli/lib/config.ts';
import { write } from '#cli/lib/write.ts';
import * as holidays from '#src/holidays/all.ts';

await checkHolidays(holidays, { interactive: true });

await write({
	presets: holidays,
	baseDir: HOLIDAYS_DIR,
	calendarName: '대한민국의 공휴일',
});
