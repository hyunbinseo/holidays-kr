import { DooraySendMessage } from 'new-request';
import { loadEnvFile } from 'process';
import { Agent, fetch } from 'undici';
import { array, isoDate, object, parse, pipe, string, transform } from 'valibot';

const Schema = pipe(
	object({
		brdList: array(
			object({
				title: string(),
				disp_write_dt: pipe(
					string(),
					isoDate(),
					transform((v) => new Date(v)),
				),
			}),
		),
	}),
	transform(({ brdList }) => brdList),
);

/**
 * @param {string | undefined} value
 * @returns {value is `https://hook.dooray.com/services/${string}`}
 */
const isDoorayWebhookUrl = (value) => {
	return !!value && value.startsWith('https://hook.dooray.com/services/');
};

// The message cannot be sent under these circumstances.
// - `.env` file is not found
// - webhook URL is not valid

// These are configuration errors and are not handled.

loadEnvFile();
const doorayWebhookUrl = process.env.DOORAY_URL;
if (!isDoorayWebhookUrl(doorayWebhookUrl)) throw new Error();

try {
	const response = await fetch('https://www.kasa.go.kr/web/board/ajax/list.do?menu_cd=000024', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		body: new URLSearchParams({
			currentPage: '1',
			searchData: 'contdata',
			searchText: '월력요항',
			countPerPage: '10',
		}),
		// TODO Remove workaround:
		// TypeError: fetch failed
		// [cause]: Error: unable to verify the first certificate
		// code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE'
		dispatcher: new Agent({ connect: { rejectUnauthorized: false } }),
	});

	if (!response.ok) throw new Error('우주항공청 누리집 요청에 실패했습니다.');

	const posts = parse(Schema, await response.json());
	const currentYear = new Date().getFullYear();

	for await (const post of posts) {
		if (post.disp_write_dt.getFullYear() === currentYear) {
			const response = await DooraySendMessage(
				{
					botName: '대한민국의 공휴일',
					text: post.title,
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
