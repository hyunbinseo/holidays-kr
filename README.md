# 대한민국의 공휴일

[![Netlify Status](https://api.netlify.com/api/v1/badges/0da720a3-e3be-4e6e-a9e1-c8678f2c432f/deploy-status)](https://app.netlify.com/sites/holidays-kr/deploys)

다 함께 쉬는 날을 `csv`, `ics`, `json` 파일 형식으로 가공한 [자료](#파일-다운로드)입니다.

구글, 애플 캘린더 등에서 구독할 수 있도록 공개 캘린더 URL도 [제공](#캘린더-구독)합니다.

> **Note**
> 매년 월력요항이 발표된 이후 작업이 이뤄집니다. 지연될 경우 이슈를 남겨주세요.

## 주요 특징

- 월력요항[^1]에 게재된 '관공서의 공휴일'을 가공한 자료입니다.
- 공휴일 명칭은 [공휴일에 관한 법률](https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=233829)을 따릅니다. (예: 기독탄신일)
- 공휴일이 아닌 국경일은 포함하지 않습니다. (예: 제헌절)
- 지방 공휴일은 포함하지 않습니다. (예: [4·3희생자추념일](https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1342242))
- 제공되는 `csv` 파일은 [Google 캘린더와 호환](https://support.google.com/calendar/answer/37118?hl=ko)됩니다.
- 제공되는 `ics` 파일은 iCalendar 표준을 따릅니다.

## 문제 상황

[구글](https://calendar.google.com/calendar/embed?src=ko.south_korea%23holiday%40group.v.calendar.google.com&ctz=Asia%2FSeoul), [애플](https://calendars.icloud.com/holidays/kr_ko.ics)에서 제공하는 캘린더에는 공휴일이 제대로 표시되지 않습니다.

공식 자료를 바탕으로 만든 공유 캘린더를 [구독](#캘린더-구독)하면 정상적으로 표시됩니다.

| 제헌절 (2023년 7월 17일)                                                                                                                                | 쉬는 날 추석 연휴 (2023년 10월 2일)                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Google 캘린더의 제헌절 (2023년 7월 17일) 일정](https://user-images.githubusercontent.com/47051820/204233708-cadf9853-b17c-4260-b879-f357d470fc23.png) | ![Google 캘린더의 쉬는 날 추석 연휴 (2023년 10월 2일) 일정](https://user-images.githubusercontent.com/47051820/204233729-4cc5c1ef-1cf0-42e9-b615-c1a57907d671.png) |
| 공휴일이 아니지만 '대한민국의 휴일' 캘린더에 표시됩니다.                                                                                                | 2023년 월력요항에 따르면 대체 공휴일이 아닙니다.                                                                                                                   |

| 석가탄신일 (2023년 5월 26일)                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![macOS 캘린더의 석가탄신일 (2023년 5월 26일) 일정](https://user-images.githubusercontent.com/47051820/209050718-eb7266fa-a38a-4a54-bedc-8f4a0e219274.png) |
| '부처님 오신 날'은 [음력 4월 8일](https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=233829#0000)로 2023년 5월 27일입니다.                                       |

## 캘린더 구독

`https://holidays.hyunbin.page/basic.ics` 주소를 구독합니다.

> **Warning**
> 위 URL을 직접 공유하는 것을 금합니다. [holidays.hyunbin.page](https://holidays.hyunbin.page/)를 공유합니다.

> **Note**
> Google 캘린더에서 새로 추가된 공휴일을 불러오는데 [24시간 이상](https://support.google.com/calendar/answer/37100?hl=ko) 걸릴 수 있습니다.

- [Google Calendar](https://support.google.com/calendar/answer/37100?hl=ko) [웹](https://calendar.google.com/): '다른 캘린더' 옆 `+` > URL로 추가
- [Apple iCloud 캘린더](https://support.apple.com/ko-kr/HT202361): 파일 > 새로운 캘린더 구독

![macOS 캘린더 앱에서 새로운 캘린더를 구독하는 대화상자](https://user-images.githubusercontent.com/47051820/204253040-05f5d740-19df-4f93-aa51-190fefc73022.png)

## 일정 가져오기

[다운로드한 파일](#파일-다운로드)에 포함된 공휴일 일정을 불러와 등록합니다. 1회성입니다.

- [Google Calendar](https://support.google.com/a/users/answer/37118?hl=ko) [웹](https://calendar.google.com/): '다른 캘린더' 옆 `+` > 가져오기
- [Mac 캘린더](https://support.apple.com/ko-kr/guide/calendar/icl1023/mac): 파일 > 가져오기

## 파일 다운로드

- 연도별 `csv`, `ics` 파일은 [public](public) 폴더에 위치합니다.
- 모든 연도의 정보가 담긴 [`json`](/source/presets.json), [`ics`](/public/basic.ics) 파일이 제공됩니다.

> **Warning**
> Chromium 웹 브라우저에서는 파일이 `.txt` 확장자로 저장되지 않도록 주의합니다.

![GitHub의 Raw 버튼에 콘텍스트 메뉴가 표시된 상태](https://user-images.githubusercontent.com/47051820/194198757-b9160ea1-32f5-4ca3-956f-3c7700ad477a.png)

Chrome: 다른 이름으로 링크 저장, Firefox: 링크를 다른 이름으로 저장, Safari: 링크된 파일 다운로드

[^1]: 월력요항은 달력 제작의 기준이 되는 자료입니다. [천문법](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%B2%9C%EB%AC%B8%EB%B2%95)과 [천문법 시행령](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%B2%9C%EB%AC%B8%EB%B2%95%20%EC%8B%9C%ED%96%89%EB%A0%B9)에 의거해 작성되어 관보에 게재됩니다.
