import { DooraySendMessage } from 'new-request';
import { loadEnvFile } from 'process';
import { array, object, parse, pipe, string, transform } from 'valibot';

const Schema = pipe(
	object({
		result: object({
			rows: array(
				pipe(
					object({
						fields: object({
							ntt_sj: pipe(
								string(),
								transform((s) => s.replace(/<[^>]*>/g, '')),
							),
							url: pipe(
								string(),
								transform((s) => 'https://www.msit.go.kr' + s),
							),
							pstg_bgng_dt: pipe(
								string(),
								transform(
									(s) => new Date(`${s.substring(0, 10)}T00:00:00+09:00`),
								),
							),
						}),
					}),
					transform((v) => v.fields),
				),
			),
		}),
	}),
	transform((v) => v.result.rows),
);

/**
 * @param {string | undefined} value
 * @returns {value is `https://hook.dooray.com/services/${string}`}
 */
const isDoorayWebhookUrl = (value) => {
	return value && value.startsWith('https://hook.dooray.com/services/')
		? true
		: false;
};

// The message cannot be sent under these circumstances.
// - `.env` file is not found
// - webhook URL is not valid

// These are configuration errors and are not handled.

loadEnvFile();
const doorayWebhookUrl = process.env.DOORAY_URL;
if (!isDoorayWebhookUrl(doorayWebhookUrl)) throw new Error();

try {
	const response = await fetch(
		'https://www.msit.go.kr/bbs/list.do?sCode=user&mId=113&mPid=238&pageIndex=1&bbsSeqNo=94&nttSeqNo=&searchOpt=ALL&searchTxt=%EC%9B%94%EB%A0%A5%EC%9A%94%ED%95%AD',
	);
	if (!response.ok) throw new Error('과기부 누리집 요청에 실패했습니다.');

	const regex = /(?<=function getSerachData\(\) {\s+let data = )[^;]+/;
	const html = await response.text();

	const matched = html.match(regex);
	if (!matched) throw new Error('검색 결과 데이터를 찾지 못했습니다.');

	const json = JSON.parse(matched[0]);
	const posts = parse(Schema, json);

	const currentYear = new Date().getFullYear();

	for await (const post of posts) {
		if (post.pstg_bgng_dt.getFullYear() === currentYear) {
			const response = await DooraySendMessage(
				{
					botName: '대한민국의 공휴일',
					text: `${post.ntt_sj} ${post.url}`,
				},
				{ url: doorayWebhookUrl },
			);

			if (response instanceof Error || !response.ok)
				throw new Error('두레이 메시지 발송에 실패했습니다.');

			break;
		}
	}
} catch (e) {
	if (e instanceof Error) console.error(e);

	await DooraySendMessage(
		{
			botName: '대한민국의 공휴일',
			text: e instanceof Error ? e.toString() : '월력요항 검색에 실패했습니다.',
		},
		{ url: doorayWebhookUrl },
	);
}

process.exit();
