const jwtMiddleware = require("../../../config/jwtMiddleware");
const musicProvider = require("../../app/Music/musicProvider");
const musicService = require("../../app/Music/musicService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


// /**
//  * API No. 11
//  * API Name : 개인정보 설정 저장 API
//  * [POST] /user
//  */
// exports.postUsers = async function (req, res) {

//     /**
//      * Body: email, password, nickname
//      */
//     const {email, password, nickname} = req.body;

//     // 빈 값 체크
//     if (!email)
//         return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

//     // 길이 체크
//     if (email.length > 30)
//         return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

//     // 형식 체크 (by 정규표현식)
//     if (!regexEmail.test(email))
//         return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

//     // 기타 등등 - 추가하기


//     const signUpResponse = await userService.createUser(
//         email,
//         password,
//         nickname
//     );

//     return res.send(signUpResponse);
// };

/**
 * API No. 1
 * API Name : 날씨 조회 API
 * [GET] /weather
 */
exports.getWeather = async function (req, res) {

    const geolocation = require ('google-geolocation') ({
        key: 'AIzaSyBZp3ma4FykMG9vEjSmsm42fC8aOtUA0oQ',
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
                weatherName = currentWeather.weather[0].main;
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
 * API No. 9
 * API Name : 플레이리스트 폴더 생성 및 삭제 API
 * [POST] /playlist
 */
exports.setFolder = async function (req, res) {
    var { folderId , folderName } = req.body;


    if(!folderId)
        return res.send(response(baseResponse.FOLDER_ID_EMPTY ));
    if(!folderName)
        return res.send(response(baseResponse.FOLDER_NAME_EMPTY ));

    // 숫자 형식 체크
    var regExp = /^[0-9]+$/;
    if(!regExp.test(folderId))
        return res.send(response(baseResponse.INPUT_NUMBER));
    
    // 폴더이름 제한 (3-20)
    var regExp = /^[가-힣a-zA-Z]{2,20}$/;
    if(!regExp.test(folderName))
        return res.send(response(baseResponse.SET_FOLDER_NAME));
    
    const [checkStatus] = await musicProvider.existFolder(folderId);
    const [folderStatus] = await musicProvider.folderStatus(folderId);

    if (checkStatus.exist == 0) {
        const addFolder = await musicService.setFolder(folderId, folderName);
        return res.send(addFolder);
    } else {
        if (folderStatus.status == 1) {
            const updateFolderDelete = await musicService.deleteFolder(folderId, folderName);
            return res.send(updateFolderDelete);
        } else {
            const updateFolderAdd = await musicService.updateFolder(folderId, folderName);
            return res.send(updateFolderAdd);
        }
    }
};

/**
 * API No. 4
 * API Name : 입력한 기분 저장 API
 * [POST] /feeling/:num
 */
 exports.setFeeling = async function (req, res) {
    const feelNum = req.params.num;


    if(!feelNum)
        return res.send(response(baseResponse.FEELING_EMPTY ));

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
    if(weather == ' '){
        const weatherMusics = await musicProvider.retrieveWeatherMusic();
    }
    if(weather == ' '){
        const weatherMusics = await musicProvider.retrieveWeatherMusic();
    }

    return res.send(response({ "isSuccess": true, "code": 1000, "message":"날씨별 음악 조회 성공" }, weatherMusics));
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
    // if(!feeling)
    //     return res.send(baseResponse.);

    
    var feelingMusics = {};
    if(feeling.feeling === 1 || feeling.feeling === 2){
        feelingMusics = await musicProvider.retrieveFeelingMusic1();
        console.log(feelingMusics[0].musicName);
        const YoutubeMusicApi = require('youtube-music-api');
        const api = new YoutubeMusicApi();
        api.initalize() // Retrieves Innertube Config
        .then(info => {
            api.search(feelingMusics[0].musicName, "video").then(result => console.log(result)) // just search for songs
        });
    } else if(feeling.feeling === 3){
        feelingMusics = await musicProvider.retrieveFeelingMusic2();
    } else if(feeling.feeling === 4){
        const type = await musicProvider.retrieveSadType();
        if(type === 1){
            feelingMusics = await musicProvider.retrieveFeelingMusic3();
        } else if(type === 2){
            feelingMusics = await musicProvider.retrieveFeelingMusic4();
        }
    } else if(feeling.feeling === 5){
        const type = await musicProvider.retrieveAngryType();
        if(type === 1){
            feelingMusics = await musicProvider.retrieveFeelingMusic5();
        } else if(type === 2){
            feelingMusics = await musicProvider.retrieveFeelingMusic3();
        }
    }

    return res.send(response({ "isSuccess": true, "code": 1000, "message":"기분별 음악 조회 성공" }, feelingMusics));
};