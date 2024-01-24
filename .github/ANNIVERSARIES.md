# 대한민국의 기념일

과학기술정보통신부에서 발표한 월력요항을 `csv`, `json`, `ics` 형식으로 가공한 자료입니다. 공휴일은 [이곳]에서 확인합니다.

[이곳]: README.md

## 제공 형식

- [캘린더 구독] - 구글, 애플 캘린더 등 지원
- [텍스트 파일] - 웹 호스팅 제공, 다운로드 지원

[캘린더 구독]: #공유-캘린더
[텍스트 파일]: #텍스트-파일

## 공유 캘린더

`https://holidays.hyunbin.page/anniversaries/basic.ics` 주소로 새로운 캘린더를 구독합니다.

> [!WARNING]
> 위 주소를 직접 공유하는 것을 금합니다. [holidays.hyunbin.page]를 공유합니다.

[holidays.hyunbin.page]: https://holidays.hyunbin.page/

## 텍스트 파일

생성된 모든 텍스트 파일은 [public/anniversaries](/public/anniversaries) 디렉터리에 위치합니다.

```
./public/anniversaries
├── basic.ics   # 모든 연도 (2022년~)
├── basic.json  # 모든 연도 (2022년~)
├── 2022.csv    # 특정 연도
├── 2022.ics    # 특정 연도
├── 2022.json   # 특정 연도
├── 2023.csv
├── 2023.ics
├── 2023.json
└── (하략)
```

위 파일들은 [holidays.hyunbin.page]에 게시되어 있습니다.

```
# (예시) 다음 파일은
./public/anniversaries/basic.json

# 다음 URL에서 확인할 수 있습니다.
https://holidays.hyunbin.page/anniversaries/basic.json
```
