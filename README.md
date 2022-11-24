# 대한민국의 공휴일

월력요항[^1]의 '국경일과 관공서의 공휴일'을 가공한 자료입니다.

- 공휴일의 명칭은 [공휴일에 관한 법률](https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=233829)을 따릅니다.
- 공휴일이 아닌 국경일은 포함하지 않습니다. (예: 제헌절)
- 지방 공휴일은 포함하지 않습니다. (예: [4·3희생자추념일](https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1342242))
- ISO 8601 형식의 날짜를 사용합니다. (예: 2022-10-05)
- [Google 캘린더에 호환되는 파일 형식](https://support.google.com/calendar/answer/37118?hl=ko)을 사용합니다.

```jsonc
{
  "YYYY-01-01": "1월 1일",
  "YYYY-03-01": "3ㆍ1절",
  "YYYY-05-05": "어린이날",
  "YYYY-06-06": "현충일",
  "YYYY-08-15": "광복절",
  "YYYY-10-03": "개천절",
  "YYYY-10-09": "한글날",
  "YYYY-12-25": "기독탄신일"
}
// 설날 전날, 설날, 설날 다음 날 (음력 12월 말일, 1월 1일, 2일)
// 부처님 오신 날 (음력 4월 8일)
// 추석 전날, 추석, 추석 다음 날 (음력 8월 14일, 15일, 16일)
```

## 다운로드

연도별 자료는 [/output](output) 폴더에 정리되어 있습니다.

> **Warning**
> Chromium 웹 브라우저에서는 파일이 `.txt` 확장자로 저장되지 않도록 주의합니다.

![GitHub: Raw file download](https://user-images.githubusercontent.com/47051820/194198757-b9160ea1-32f5-4ca3-956f-3c7700ad477a.png)

(ABC 순) Chrome: 다른 이름으로 링크 저장 / Firefox: 링크를 다른 이름으로 저장 / Safari: 링크된 파일 다운로드

## 활용 방법

Google 캘린더의 `가져오기` 기능을 사용해 CSV 또는 ICS 파일의 일정을 등록합니다.

![Google Calendar: Import from file](https://user-images.githubusercontent.com/47051820/193986668-6367b034-3523-48c0-b253-0453638068bd.png)

Google 캘린더에서 제공하는 [대한민국의 휴일](https://calendar.google.com/calendar/embed?src=ko.south_korea%23holiday%40group.v.calendar.google.com&ctz=Asia%2FSeoul)에는 대체 공휴일이 포함되어 있지 않습니다.

## 알림 설정

`Watch / Custom / Releases`를 ✅해 이메일 알림을 받아볼 수 있습니다.

![GitHub: Custom Watch](https://user-images.githubusercontent.com/47051820/193986661-2ca906de-0bcb-4756-a688-a93877931d79.png)

[^1]: 월력요항은 달력 제작의 기준이 되는 자료입니다. [천문법](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%B2%9C%EB%AC%B8%EB%B2%95)과 [천문법 시행령](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%B2%9C%EB%AC%B8%EB%B2%95%20%EC%8B%9C%ED%96%89%EB%A0%B9)에 의거해 작성되어 관보에 게재됩니다.
