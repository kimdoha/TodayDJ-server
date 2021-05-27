const jwtMiddleware = require("../../../config/jwtMiddleware");
const musicProvider = require("../../app/Music/musicProvider");
const musicService = require("../../app/Music/musicService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 날씨 조회 API
 * [GET] /weather
 */
exports.getWeather = async function (req, res) {

    const geolocation = require ('google-geolocation') ({
        key: 'AIzaSyABr_zvB4ZRyLUHUB1DHx-RvNxPs9Gp4yI',
        timeout: 2000
      });

      const OpenWeatherMapHelper = require("openweathermap-node");
      const helper = new OpenWeatherMapHelper(
          {
              APPID: 'a4946aacf5e9e85273a8c53542d131b3',
              units: "imperial"
          }
      );
  
      
    // Configure API parameters
    const params = {
    wifiAccessPoints: [
        {
        macAddress: '01:23:45:67:89:AB',
        signalStrength: -65,
        signalToNoiseRatio: 40
        }
    ]
    };
    var weatherName, area, currentData;

    // Get data
    geolocation (params, (err, data) => {
    if (err) {
        console.log (err);
        return;
    }
        console.log (data);
        lat = data.location.lat;
        lng = data.location.lng;

        helper.getCurrentWeatherByGeoCoordinates(lat, lng, (err, currentWeather) => {
            if(err){
                console.log(err);
                return res.send(response(baseResponse.EMPTY_WEATHER_RESULT));
            }
            else{
                console.log(currentWeather);
                weatherName = currentWeather.weather[0].description;
                area = currentWeather.name;
                weather = async function (req, res) {
                    const [checkStatus] = await musicProvider.existWeather();
                    console.log(checkStatus);
                   
                    // 오늘의 날씨 저장된게 없으면 -------수정
                    if (checkStatus.exist == 0) {
                        const addWeather = await musicService.setWeather(weatherName, area);
                        console.log("날씨 저장 성공");
                    } else {
                        const updateWeather = await musicService.updateWeather(weatherName, area);
                        console.log("날씨 업뎃 성공");
                    }
                }
                weather();
                return res.send(response({ "isSuccess": true, "code": 1000, "message":"날씨 조회 성공" }, currentWeather));
            }
        });
    });

};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
// exports.getUserById = async function (req, res) {

//     /**
//      * Path Variable: userId
//      */
//     const userId = req.params.userId;

//     if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

//     const userByUserId = await userProvider.retrieveUser(userId);
//     return res.send(response(baseResponse.SUCCESS, userByUserId));
// };


/**
 * API No. 4
 * API Name : 입력한 기분 저장 API
 * [POST] /feeling/:num
 */
 exports.setFeeling = async function (req, res) {
    const feelNum = req.params.num;


    if(!feelNum)
        return res.send(response(baseResponse.FEELING_EMPTY));

    // 숫자 형식 체크
    var regExp = /^[0-9]+$/;
    if(!regExp.test(feelNum))
        return res.send(response(baseResponse.INPUT_NUMBER));
    
    if(feelNum < 1 || feelNum > 5)
        return res.send(response(baseResponse.FEELING_ID_EXCEED));

    const [checkStatus] = await musicProvider.existFeeling();
    console.log(checkStatus);
    
    // 오늘의 날씨 저장된게 없으면 -------수정
    if (checkStatus.exist == 0) {
        const addFeeling = await musicService.setFeeling(feelNum);
        return res.send(addFeeling);
    } else {
        const updateFeeling = await musicService.updateFeeling(feelNum);
        console.log("기분 업뎃 성공");
        return res.send(updateFeeling);
    }
};



/**
 * API No. 5
 * API Name : 날씨 정보를 바탕으로 추천 음악 조회
 * [GET] /weather/music
 */

exports.weatherMusics = async function (req, res) {

    const weather = await musicProvider.retrieveWeather();
    if(!weather)
        return res.send(response(baseResponse.EMPTY_WEATHER_RESULT));
    
    var thunderstormWeather1 = ['thunderstorm with light rain', 'thunderstorm with rain', 'light thunderstorm'];
    var thunderstormWeather2 = [ 'thunderstorm with heavy rain','thunderstorm','heavy thunderstorm', 'ragged thunderstorm', 'thunderstorm with light drizzle', 'thunderstorm with drizzle', 'thunderstorm with heavy drizzle'];
   
    var drizzleWeather1 = ['light intensity drizzle', 'drizzle', 'light intensity drizzle rain','drizzle rain'];
    var drizzleWeather2 = [ 'heavy intensity drizzle','heavy intensity drizzle rain','shower rain and drizzle', 'heavy shower rain and drizzle', 'shower drizzle'];
  
    var rainWeather1 = ['light rain', 'moderate rain', 'light intensity drizzle rain','light intensity shower rain'];
    var rainWeather2 = [ 'heavy intensity rain','very heavy rain','extreme rain', 'freezing rain', 'shower drizzle', 'shower rain', 'heavy intensity shower rain', 'ragged shower rain'];
   
    var snowWeather1 = ['light snow', 'Snow', 'Sleet', 'Light shower sleet', 'Light rain and snow', 'Light shower snow'];
    var snowWeather2 = [ 'Heavy snow', 'Shower sleet', 'Rain and snow', 'shower drizzle', 'Shower snow', 'Heavy shower snow'];
       
    var atmosphereWeather1 = ['mist', 'Smoke', 'Haze', 'Light', 'sand/ dust whirls', 'fog', 'sand', 'dust'];
    var atmosphereWeather2 = [ 'volcanic ash', 'squalls', 'tornado'];
    
    var clearWeather = ['clear sky'];

    var cloudsWeather1 = ['few clouds', 'scattered clouds'];
    var cloudsWeather2 = [ 'broken clouds', 'overcast clouds'];

    var weatherMusics = {};

    if(thunderstormWeather1.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic1();
        
    } else if (thunderstormWeather2.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic2();
    } else if (drizzleWeather1.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic3();
    } else if (drizzleWeather2.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic1();
    } else if (rainWeather1.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic1();
    } else if (rainWeather2.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic2();
    } else if (snowWeather1.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic3();
    } else if (snowWeather2.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic1();
    } else if (atmosphereWeather1.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic3();
    } else if (atmosphereWeather2.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic2();
    } else if (clearWeather.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic4();
    } else if (cloudsWeather1.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic3();
    } else if (cloudsWeather2.includes(weather.weather)){
        weatherMusics = await musicProvider.retrieveWeatherMusic1();
    } else {
        return res.send(response(baseResponse.EMPTY_WEATHER_RESULT));
    }

    await musicProvider.retrieveYoutubeUrl(weatherMusics);
    var type = 0;
    var weath = weather.weather;
    //await musicService.setYoutubeUrl(weatherMusics);
    await musicProvider.settingRecommend(type, weath, weatherMusics);
    

    setTimeout(function(){
        return res.send(response({ "isSuccess": true, "code": 1000, "message": "날씨별 음악 조회 성공" }, weatherMusics ));
    }, 5000);
   
};


/**
 * API No. 11
 * API Name : 입력한 기분 저장 API
 * [POST] /user/:type1/:type2
 */
 exports.setUser = async function (req, res) {
    const type1 = req.params.type1;
    const type2 = req.params.type2;

    if(!type1 || !type2)
        return res.send(response(baseResponse.TYPE_EMPTY ));

    // 숫자 형식 체크
    var regExp = /^[0-9]+$/;
    if(!regExp.test(type1) || !regExp.test(type2))
        return res.send(response(baseResponse.INPUT_NUMBER));
    
    if((type1 < 1 || type1 > 2) || (type2 < 1 || type2 > 2))
        return res.send(response(baseResponse.TYPE_RANGE));
    
    const [checkStatus] = await musicProvider.existUser();
    console.log(checkStatus);

    if (checkStatus.exist == 0) {
        const addType = await musicService.setType(type1, type2);
        return res.send(addType);
    } else {
        const updateType = await musicService.updateType(type1, type2);
        return res.send(updateType);
    }
};

/**
 * API No. 3
 * API Name : 입력한 기분을 바탕으로 추천 음악 조회
 * [GET] /feeling/music
 */
// 익사이팅 해피 쏘쏘 새드 앵그리 (1, 2, 3, 4, 5)
exports.feelingMusics = async function (req, res) {

    const feeling = await musicProvider.retrieveFeeling();
    if(!feeling || !feeling.feeling)
        return res.send(baseResponse.EMPTY_FEELING_RESULT);

    
    var feelingMusics = {};


    if(feeling.feeling === 1 || feeling.feeling === 2){
        feelingMusics = await musicProvider.retrieveFeelingMusic1();
        console.log(feelingMusics[0].musicName);
        console.log(feelingMusics[0].singer);

    await musicProvider.retrieveYoutubeUrl2(feelingMusics);
    var type = 1;
    var feel = feeling.feeling;
    await musicProvider.settingRecommend2(type, feel, feelingMusics);
    

    setTimeout(function(){
        return res.send(response({ "isSuccess": true, "code": 1000, "message": "[익사이팅, 해피]기분별 음악 조회 성공" }, feelingMusics ));
    }, 5000);

        
    } else if(feeling.feeling === 3){

        feelingMusics = await musicProvider.retrieveFeelingMusic2();

        console.log(feelingMusics[0].musicName);
        console.log(feelingMusics[0].singer);


    await musicProvider.retrieveYoutubeUrl2(feelingMusics);
    var type = 1;
    var feel = feeling.feeling;
    await musicProvider.settingRecommend2(type, feel, feelingMusics);
    

    setTimeout(function(){
        return res.send(response({ "isSuccess": true, "code": 1000, "message": "[쏘쏘]기분별 음악 조회 성공" }, feelingMusics ));
    }, 5000);
      
    } else if(feeling.feeling === 4){
        const usertype = await musicProvider.retrieveSadType();
        console.log(usertype);
        if(usertype.sadType1 === 1){
            feelingMusics = await musicProvider.retrieveFeelingMusic3();

            await musicProvider.retrieveYoutubeUrl2(feelingMusics);
            var type = 1;
            var feel = feeling.feeling;
            await musicProvider.settingRecommend2(type, feel, feelingMusics);
            
        
            setTimeout(function(){
                return res.send(response({ "isSuccess": true, "code": 1000, "message": "[새드1]기분별 음악 조회 성공" }, feelingMusics ));
            }, 5000);

        } else if(usertype.sadType1 === 2){
            feelingMusics = await musicProvider.retrieveFeelingMusic4();

            await musicProvider.retrieveYoutubeUrl2(feelingMusics);
            var type = 1;
            var feel = feeling.feeling;
            await musicProvider.settingRecommend2(type, feel, feelingMusics);
            
        
            setTimeout(function(){
                return res.send(response({ "isSuccess": true, "code": 1000, "message": "[새드2]기분별 음악 조회 성공" }, feelingMusics ));
            }, 5000);
        
        }

    } else if(feeling.feeling === 5){
        const usertype = await musicProvider.retrieveAngryType();
        console.log(usertype);
        if(usertype.angryType2 === 1){
            feelingMusics = await musicProvider.retrieveFeelingMusic5();
            console.log(feelingMusics);
      
            await musicProvider.retrieveYoutubeUrl2(feelingMusics);
            var type = 1;
            var feel = feeling.feeling;
            await musicProvider.settingRecommend2(type, feel, feelingMusics);
            
        
            setTimeout(function(){
                return res.send(response({ "isSuccess": true, "code": 1000, "message": "[앵그리1]기분별 음악 조회 성공" }, feelingMusics ));
            }, 5000);
        
        
        } else if(usertype.angryType2 === 2){
            feelingMusics = await musicProvider.retrieveFeelingMusic3();
            console.log(feelingMusics);

            await musicProvider.retrieveYoutubeUrl2(feelingMusics);
            var type = 1;
            var feel = feeling.feeling;
            await musicProvider.settingRecommend2(type, feel, feelingMusics);
            
        
            setTimeout(function(){
                return res.send(response({ "isSuccess": true, "code": 1000, "message": "[앵그리2]기분별 음악 조회 성공" }, feelingMusics ));
            }, 5000);
        }
    }
}

exports.getMusicList = async function (req, res) {

    const year = req.params.year;
    const mon = req.params.mon;
    const day = req.params.day;

    const musicList1 = await musicProvider.retrieveMusicList1(year, mon, day);
    const musicList2 = await musicProvider.retrieveMusicList2(year, mon, day);
    console.log(musicList1, musicList2);

    if(!musicList1 && !musicList2)
        return res.send(baseResponse.EMPTY_WEATHERFEELING_RESULT);

    let totalData = [];
    if(musicList1){
        totalData[0] = musicList1;
    } 
    if(musicList2){
        totalData[1] = musicList2;
    }
    return res.send(response({ "isSuccess": true, "code": 1000, "message": "날씨 + 기분 음악 조회 성공" }, totalData ));
};


exports.getChart= async function (req, res) {

    const month = req.params.month;
    if (!month) return res.send(errResponse(baseResponse.NUM_MONTH));

    const chart = await musicProvider.retrieveGetChart(month);


    return res.send(response({ "isSuccess": true, "code": 1000, "message": "월별 기분별 통계 성공" }, chart ));
};


exports.getTotalChart = async function (req, res) {

    const chart = await musicProvider.retrieveTotalGetChart();
    return res.send(response({ "isSuccess": true, "code": 1000, "message": "전체 기분별 통계 성공" }, chart ));
};

// 플레이리스트 좋아요
// playlist/like/:recomId
exports.postLike = async function (req, res) {
    const recomId = req.params.recomId;

    if(!recomId)
        return res.send(response(baseResponse.NUM_RECOMM));

    // 숫자 형식 체크
    var regExp = /^[0-9]+$/;
    if(!regExp.test(recomId))
        return res.send(response(baseResponse.INPUT_NUMBER));
    
    const recomStatus = await musicProvider.existRecommend(recomId);
    if(recomStatus.length < 1)
        return res.send(response(baseResponse.PLAYLIST_RESULT));
    
    const [checkStatus] = await musicProvider.existPlaylist(recomId);
    const [likeStatus] = await musicProvider.likeStatus(recomId);

    if (checkStatus.exist == 0) {
        const addFolder = await musicService.setPlaylist(recomId);
        return res.send(addFolder);
    } else {
        if (likeStatus.status == 1) {
            const likeDelete = await musicService.deleteLike(recomId);
            return res.send(likeDelete);
        } else {
            const likeAdd = await musicService.updateLike(recomId);
            return res.send(likeAdd);
        }
    }
};

exports.feelingPlaylist= async function (req, res) {

    const num = req.params.num;
    if (!num) return res.send(errResponse(baseResponse.FEELING_EMPTY));
    
    var regExp = /^[0-9]+$/;
    if(!regExp.test(num))
        return res.send(response(baseResponse.INPUT_NUMBER));

    if(num < 1 || num > 5)
        return res.send(response(baseResponse.FEELING_ID_EXCEED));

    const playlist = await musicProvider.retrievePlaylistFeeling(num);
    if(playlist.length< 1)
        return res.send(response(baseResponse.EMPTY_PLAYLIST1_RESULT));

    return res.send(response({ "isSuccess": true, "code": 1000, "message": "기분별 플레이리스트 조회 성공" }, playlist ));
};

exports.feelingPlaylist2 = async function (req, res) {

    const num = req.params.num;
    if (!num) return res.send(errResponse(baseResponse.WEATHER_INDEX_EMPTY));
    
    var regExp = /^[0-9]+$/;
    if(!regExp.test(num))
        return res.send(response(baseResponse.INPUT_NUMBER));

    if(num < 1 || num > 7)
        return res.send(response(baseResponse.WEATHER_EXCEED));
    if(num == 1){
        const playlist = await musicProvider.retrievePlaylistWeather1(num);
        if(playlist.length < 1)
            return res.send(response(baseResponse.EMPTY_PLAYLIST2_RESULT));
            
        return res.send(response({ "isSuccess": true, "code": 1000, "message": "날씨별 플레이리스트 조회 성공" }, playlist ));
    } else if(num == 2){
        const playlist = await musicProvider.retrievePlaylistWeather2(num);
        if(playlist.length < 1)
            return res.send(response(baseResponse.EMPTY_PLAYLIST1_RESULT));
        return res.send(response({ "isSuccess": true, "code": 1000, "message": "날씨별 플레이리스트 조회 성공" }, playlist ));
    } else if(num == 3){
        const playlist = await musicProvider.retrievePlaylistWeather3(num);
        if(playlist.length < 1)
            return res.send(response(baseResponse.EMPTY_PLAYLIST1_RESULT));
        return res.send(response({ "isSuccess": true, "code": 1000, "message": "날씨별 플레이리스트 조회 성공" }, playlist ));
    } else if(num == 4){
        const playlist = await musicProvider.retrievePlaylistWeather4(num);
        if(playlist.length < 1)
            return res.send(response(baseResponse.EMPTY_PLAYLIST1_RESULT));
        return res.send(response({ "isSuccess": true, "code": 1000, "message": "날씨별 플레이리스트 조회 성공" }, playlist ));
    } else if(num == 5){
        const playlist = await musicProvider.retrievePlaylistWeather5(num);
        if(playlist.length < 1)
            return res.send(response(baseResponse.EMPTY_PLAYLIST1_RESULT));
        return res.send(response({ "isSuccess": true, "code": 1000, "message": "날씨별 플레이리스트 조회 성공" }, playlist ));
    } else if(num == 6){
        const playlist = await musicProvider.retrievePlaylistWeather6(num);
        if(playlist.length < 1)
            return res.send(response(baseResponse.EMPTY_PLAYLIST1_RESULT));
        return res.send(response({ "isSuccess": true, "code": 1000, "message": "날씨별 플레이리스트 조회 성공" }, playlist ));
    } else if(num == 7){
        const playlist = await musicProvider.retrievePlaylistWeather7(num);
        if(playlist.length < 1)
            return res.send(response(baseResponse.EMPTY_PLAYLIST1_RESULT));
        return res.send(response({ "isSuccess": true, "code": 1000, "message": "날씨별 플레이리스트 조회 성공" }, playlist ));
    } 
};


exports.totalPlaylist= async function (req, res) {


    const playlist = await musicProvider.retrievePlaylistTotal();
    if(playlist.length< 1)
        return res.send(response(baseResponse.EMPTY_PLAYLIST_RESULT));

    return res.send(response({ "isSuccess": true, "code": 1000, "message": "전체 플레이리스트 조회 성공" }, playlist ));
};