import * as anniversaries from '#src/anniversaries.ts';
import { write } from './index.ts';

await write('대한민국의 기념일', 'anniversaries', anniversaries);
