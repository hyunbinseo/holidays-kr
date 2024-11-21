import { equal } from 'node:assert/strict';
import test from 'node:test';
import * as all from '../src/holidays/all.ts';
import * as latest from '../src/holidays/latest.js';

const year = new Date().getUTCFullYear();
const month = new Date().getUTCMonth() + 1;

// 매년 6월 말까지 다음 연도의 월력요항을 작성하여 관보에 게재
const shouldIncludeNextYear = month >= 7;

test(`includes y${year}`, () => {
	for (const presets of [all, latest]) //
		equal(`y${year}` in presets, true);
});

test(`includes y${year + 1}`, { skip: !shouldIncludeNextYear }, () => {
	for (const presets of [all, latest]) //
		equal(`y${year + 1}` in presets, true);
});
