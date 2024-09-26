# 대한민국의 공휴일

우주항공청에서 발표한 월력요항[^1]을 `csv`, `json`, `ics` 형식으로 가공한 자료입니다. 기념일은 [이곳]에서 확인합니다.

[^1]: 월력요항은 달력 제작의 기준이 되는 자료입니다. [천문법]과 [천문법 시행령]에 따라 작성되어 관보에 게재됩니다.

[천문법]: https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%B2%9C%EB%AC%B8%EB%B2%95
[천문법 시행령]: https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%B2%9C%EB%AC%B8%EB%B2%95%20%EC%8B%9C%ED%96%89%EB%A0%B9
[이곳]: ANNIVERSARIES.md

## 제작 동기

- 애플 캘린더 등 - 대체 공휴일 일정 미제공
- 구글 캘린더 등 - [잘못된 공휴일 정보] 제공
- [공공 데이터 포털] - XML만 제공, API 키 강제[^2]

[^2]: 회원가입, 본인인증, API 활용 신청을 해야만 사용할 수 있습니다. 비밀 키가 사용되므로 클라이언트 코드에서 사용할 수 없습니다.

[잘못된 공휴일 정보]: https://github.com/hyunbinseo/holidays-kr/discussions/8
[공공 데이터 포털]: https://www.data.go.kr/data/15012690/openapi.do

## 제공 형식

- [캘린더 구독] - 구글[^3], 애플[^4] 캘린더 등 지원
- [텍스트 파일] - 웹 호스팅 제공, 다운로드 지원
- [자바스크립트 패키지] - `ESM` 및 `CJS` 지원

[캘린더 구독]: #공유-캘린더
[텍스트 파일]: #텍스트-파일
[자바스크립트 패키지]: https://www.npmjs.com/package/@hyunbinseo/holidays-kr

[^3]: [다른 사람의 Google Calendar 구독하기] 문서를 참고합니다. (링크를 사용하여 공개 캘린더 추가하기)

[^4]: [iCloud 캘린더 구독 사용하기] 문서를 참고합니다.

[다른 사람의 Google Calendar 구독하기]: https://support.google.com/calendar/answer/37100?hl=ko
[iCloud 캘린더 구독 사용하기]: https://support.apple.com/ko-kr/HT202361

## 주요 특징

- 명칭은 [공휴일에 관한 법률]을 따릅니다. (기독탄신일 등)
- 공휴일이 아닌 국경일은 포함하지 않습니다. (제헌절 등)
- 지방 공휴일은 포함하지 않습니다. ([4·3희생자추념일] 등)
- 제공되는 `csv` 파일은 [Google 캘린더 형식]을 따릅니다.
- 제공되는 `ics` 파일은 iCalendar 표준을 따릅니다.

[공휴일에 관한 법률]: https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=233829
[4·3희생자추념일]: https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1342242
[Google 캘린더 형식]: https://support.google.com/calendar/answer/37118?hl=ko

## 공유 캘린더

`https://holidays.hyunbin.page/basic.ics` 주소로 새로운 캘린더를 구독합니다.

> [!WARNING]
> 위 주소를 직접 공유하는 것을 금합니다. [holidays.hyunbin.page]를 공유합니다.

[holidays.hyunbin.page]: https://holidays.hyunbin.page/

> [!NOTE]
> Google Calendar에 변경사항이 표시되려면 최대 12시간이 걸릴 수 있습니다.

![iOS 캘린더 앱에서의 '구독 캘린더 추가' 과정](https://github.com/hyunbinseo/holidays-kr/assets/47051820/e623cfd9-bf66-4ad0-ac5b-5a380f4ea2fe)

## 텍스트 파일

> [!IMPORTANT]  
> 2024년 9월 4일 자로 JSON 파일 형식이 변경되었습니다.

```diff
- "2025-05-05": "어린이날",
+ "2025-05-05": ["어린이날", "부처님 오신 날"],
```

생성된 모든 텍스트 파일은 [public](/public) 디렉터리에 위치합니다.

```
./public
├── basic.ics   # 모든 연도 (2022년~)
├── basic.json  # 모든 연도 (2022년~)
├── 2022.csv    # 특정 연도
├── 2022.ics    # 특정 연도
├── 2022.json   # 특정 연도
├── 2023.csv
├── 2023.ics
├── 2023.json
├── (하략)
```

위 파일들은 [holidays.hyunbin.page]에 게시되어 있습니다.

```
# (예시) 다음 파일은
./public/basic.json

# 다음 URL에서 확인할 수 있습니다.
https://holidays.hyunbin.page/basic.json
```
