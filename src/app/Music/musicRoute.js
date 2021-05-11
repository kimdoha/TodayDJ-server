module.exports = function(app){
    const music = require('./musicController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 날씨 조회 (회원가입) API
    app.get('/weather',music.getWeather); 

    // 2. 유저 조회 API (+ 검색)
    //app.get('/app/users',music.getUsers); 

    // 3. 특정 유저 조회 API
    //app.get('/app/users/:userId', music.getUserById);

    // jwt를 사용하기 위해 jwtMiddleware 를 체이닝 방식으로 추가하는 예제
    // app.get('/app/users/:userId', jwtMiddleware, user.getUserById);
    
    // 4. 입력한 기분 저장
    app.route('/feeling/:num').post(music.setFeeling);
    
    // 5. 날씨 정보를 바탕으로 추천 음악 조회
    //app.get('/weather/music',music.weatherMusics); 
    
    // 3. 입력한 기분을 바탕으로 추천 음악 조회
    app.get('/feeling/music',music.feelingMusics);

    // 9. 플레이리스트 폴더 생성 및 삭제
    app.route('/playlist').post(music.setFolder);

    // 11. 개인 정보 설정 저장
    app.route('/user/:type1/:type2').post(music.setUser);

};