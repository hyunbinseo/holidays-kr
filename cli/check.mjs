// @ts-check

import { generateSgSendRequest } from 'sendgrid-send';
import sendgrid from '../.env.sendgrid.json' assert { type: 'json' };

console.log(new Date().toLocaleString());

const response = await fetch(
	'https://www.msit.go.kr/user/rss/rss.do?bbsSeqNo=94'
);

if (!response.ok) console.error('Fetching RSS failed.');

const match = (await response.text()).match(
	/<title><!\[CDATA\[(.*월력요항.*)]]><\/title>\s+<link><!\[CDATA\[(.+)]]><\/link>/
);

if (match) {
	const [, subject, link] = match;

	await fetch(
		generateSgSendRequest(
			{
				...sendgrid.body,
				subject,
				content: [
					{ type: 'text/html', value: `<a href="${link}">${subject}</a>` },
					{
						type: 'text/plain',
						value: '반복 예약 작업을 (일시)정지 해주시기 바랍니다.',
					},
				],
			},
			sendgrid.key
		)
	);
}
