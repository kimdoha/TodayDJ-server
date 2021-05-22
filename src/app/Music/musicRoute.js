module.exports = function(app){
    const music = require('./musicController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 날씨 조회 (회원가입) API
    app.get('/weather',music.getWeather); 

    // 2. 날씨별 + 기분별 음악 정보 조회 [캘린더 팝업 화면]
    app.get('/music/year/:year/mon/:mon/day/:day',music.getMusicList); 

    // 9. 월별 기분별 통계
    app.get('/feeling/chart/:month', music.getChart);

    // 11. 전체 기분별 통계
    app.get('/feeling/totalchart', music.getTotalChart);

    // jwt를 사용하기 위해 jwtMiddleware 를 체이닝 방식으로 추가하는 예제
    // app.get('/app/users/:userId', jwtMiddleware, user.getUserById);
    
    // 4. 입력한 기분 저장
    app.route('/feeling/:num').post(music.setFeeling);
    
    // 3. 입력한 기분을 바탕으로 추천 음악 조회
    app.get('/feeling/music',music.feelingMusics);

    // 4. 날씨 정보를 바탕으로 추천 음악 조회
    app.get('/weather/music',music.weatherMusics);

    // 9. 플레이리스트 폴더 생성 및 삭제
    app.route('/playlist').post(music.setFolder);

    // 11. 개인 정보 설정 저장
    app.route('/user/:type1/:type2').post(music.setUser);

    // 7. 플레이 리스트 좋아요 생성 및 취소
    app.route('/playlist/like/:recomId').post(music.postLike);
};