# 오늘의 디제이

## 0. 프로젝트 실행 방법

```javascript
node index.js
```

Youtube Data API, Geolocation API, OpenWeatherAPI KEY는 개인 키로 입력

 - musicController.js 

   ```javascript
    const geolocation = require ('google-geolocation') ({
           key: '키입력',
           timeout: 2000
         });
   ```

   ```javascript
   const helper = new OpenWeatherMapHelper(
     {
       APPID: '키입력',
       units: "imperial"
     }
   );
   ```

   ```javascript
   youTube.setKey('키입력');
   ```

   

## 1. 개발 주제

 현재 날씨와 어울리는 음악 한 곡과 사용자의 기분에 어울리는 음악 한 곡, 사용자별 노래를 추천해주는 앱 서비스 입니다.




## 2. 개발 내용

`Youtube Data API` , `Geolocation API` , `OpenWeatherAPI` 의 외부 API를 활용하여 날씨와 사용자의 기분별 노래를 추천하고 있습니다.

- 2.1 내 위치를 기반으로 한 날씨 조회
- 2.2. 오늘의 날씨 정보를 바탕으로 음악 추천
- 2.3. 입력한 기분 저장 + 입력한 기분을 바탕으로 추천 음악 조회 [Youtube API 연동]
- 2.4. 날씨별 + 기분별 음악 정보 조회 [캘린더 팝업 화면]
- 2.5. 월별 기분별 통계 + 전체 기분별 통계
- 2.6. 플레이리스트




## 3. API 개발 명세서

![image](https://user-images.githubusercontent.com/62235737/117556327-8fe0d880-b0a2-11eb-909b-3571d8d7de8e.png)


## 4. 사용한 기술 스택
### Server
- AWS(EC2, RDS)
- Linux
- Nginx

### Language
- Node.js

### Framework
- Express.js

### Database
- MySQL

