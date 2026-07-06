import { checkHolidays } from '#cli/lib/check.ts';
import * as holidays from '#src/holidays/all.ts';

await checkHolidays(holidays);
