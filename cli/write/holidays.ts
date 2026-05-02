import * as holidays from '#src/holidays/all.ts';
import { write } from './index.ts';

await write('대한민국의 공휴일', 'holidays', holidays);
