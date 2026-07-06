import { checkHolidays } from '#cli/check/holidays.ts';
import * as holidays from '#src/holidays/all.ts';
import { HOLIDAYS_DIR } from './config.ts';
import { write } from './index.ts';

await checkHolidays(holidays, { interactive: true });

await write({
	presets: holidays,
	baseDir: HOLIDAYS_DIR,
	calendarName: '대한민국의 공휴일',
});
