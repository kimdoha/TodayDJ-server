const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const musicService = require("./musicService");
const musicDao = require("./musicDao");

// Provider: Read 비즈니스 로직 처리

// exports.retrieveUserList = async function (email) {
//   if (!email) {
//     const connection = await pool.getConnection(async (conn) => conn);
//     const userListResult = await userDao.selectUser(connection);
//     connection.release();

//     return userListResult;

//   } else {
//     const connection = await pool.getConnection(async (conn) => conn);
//     const userListResult = await userDao.selectUserEmail(connection, email);
//     connection.release();

//     return userListResult;
//   }
// };

exports.existFolder = async function (folderId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const existResult = await musicDao.existFolder(connection, folderId);

  connection.release();

  return existResult;
}


exports.folderStatus = async function (folderId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const statusResult = await musicDao.getFolderStatus(connection, folderId);

  connection.release();

  return statusResult;
};

exports.existWeather= async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const existResult = await musicDao.existWeather(connection);

  connection.release();

  return existResult;
}


exports.existFeeling = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const existResult = await musicDao.existFeeling(connection);

  connection.release();

  return existResult;
}

// 날씨 정보 조회
exports.retrieveWeatherMusic = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const weatherResult = await musicDao.existWeather(connection);

  connection.release();

  return existResult;
}

// 개인 정보 조회

exports.existUser = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await musicDao.existUser(connection);

  connection.release();

  return userResult;
}

// feeling
exports.retrieveFeeling = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const [feelingResult] = await musicDao.retrieveFeeling(connection);

  connection.release();

  return feelingResult;
}

exports.retrieveFeelingMusic1 = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const feelingResult = await musicDao.retrieveFeelingMusics1(connection);

  connection.release();

  return feelingResult;
}

exports.retrieveFeelingMusic2 = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const feelingResult = await musicDao.retrieveFeelingMusics2(connection);

  connection.release();

  return feelingResult;
}
exports.retrieveFeelingMusic3 = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const feelingResult = await musicDao.retrieveFeelingMusics3(connection);

  connection.release();

  return feelingResult;
}
exports.retrieveFeelingMusic4 = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const feelingResult = await musicDao.retrieveFeelingMusics4(connection);

  connection.release();

  return feelingResult;
}

exports.retrieveSadType = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const [sadResult] = await musicDao.retrieveSadType(connection);

  connection.release();

  return sadResult;
}

// ANGRY
exports.retrieveAngryType = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const [angryResult] = await musicDao.retrieveAngryType(connection);

  connection.release();

  return angryResult;
}


exports.retrieveFeelingMusic5 = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const feelingResult = await musicDao.retrieveFeelingMusics5(connection);

  connection.release();

  return feelingResult;
}


exports.retrieveWeather = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const [weatherResult] = await musicDao.retrieveWeather(connection);

  connection.release();

  return weatherResult;
}

// 날씨 추천 노래
exports.retrieveWeatherMusic1 = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const [weatherResult] = await musicDao.retrieveWeatherMusic1 (connection);

  connection.release();

  return weatherResult;
}

exports.retrieveWeatherMusic2 = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const [weatherResult] = await musicDao.retrieveWeatherMusic2 (connection);

  connection.release();

  return weatherResult;
}

exports.retrieveWeatherMusic3 = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const [weatherResult] = await musicDao.retrieveWeatherMusic3(connection);

  connection.release();

  return weatherResult;
}

exports.retrieveWeatherMusic4 = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const [weatherResult] = await musicDao.retrieveWeatherMusic4(connection);

  connection.release();

  return weatherResult;
}

// 날씨에 따른 노래 추천 조회
exports.retrieveYoutubeUrl = async function (weatherMusics) {
  const connection = await pool.getConnection(async (conn) => conn);

    var musicId = weatherMusics.musicId;

    var YouTube = require('youtube-node');
    var youTube = new YouTube();
    var youTubeUrl = 'https://www.youtube.com/watch?v=';
    var thumbnailsImage = "";

    //youTube.setKey('AIzaSyBZp3ma4FykMG9vEjSmsm42fC8aOtUA0oQ');
    youTube.setKey('AIzaSyCONq4eoFv--fhsmf2C-gnbSdunHyStpSw');
    
    youTube.search(weatherMusics.musicName + " " + weatherMusics.singer + " MV", 2, {type: 'video', videoLicense:'youtube'},function(error, result) {
      if (error) {
          console.log(error);
      }
      else {
          //console.log(JSON.stringify(result, null, 2));
          //console.log(result);
          var resultjson = result.items[0];
          console.log(resultjson.snippet.thumbnails.high.url);
          console.log(resultjson.id.videoId);
          if(resultjson.snippet.thumbnails.high.url){
              thumbnailsImage = resultjson.snippet.thumbnails.high.url;
          } else {
              thumbnailsImage = "";
          }
          if(resultjson.id.videoId){
              youTubeUrl += resultjson.id.videoId;
          } else {
              youTubeUrl = "";
          }
          
          weatherMusics.youtubeUrl = youTubeUrl;
          weatherMusics.imageUrl = thumbnailsImage;

          }
        });
    

    // console.log("asyncccc");
    //await musicService.updateYoutubeInfo(musicId, youTubeUrl, thumbnailsImage);
    
    setTimeout(async function(){
       //console.log(weatherMusics);
       //console.log("youTubeUrl", youTubeUrl, "Thunbnail", thumbnailsImage);
       await musicService.updateYoutubeInfo(musicId, youTubeUrl, thumbnailsImage);
       connection.release();
       return weatherMusics;
    
    }, 3000);
}

exports.settingRecommend = async function (type, weath, weatherMusics) {
  const connection = await pool.getConnection(async (conn) => conn);
  
  var musicId = weatherMusics.musicId;
  
  
  const [checkRecommend] = await musicDao.existRecommend(connection);
  console.log(checkRecommend);

  // 오늘의 Recommend에 저장된게 없으면 -------수정
  if (checkRecommend.exist == 0) {
      const addRecommend = await musicService.setRecommend(type, weath, musicId);

  } else {
      const updateRecommend = await musicService.updateRecommend(type, weath, musicId);

  }
  console.log("done!");

  connection.release();

  return;
}

// 기분에 따른 노래 추천 조회
exports.retrieveYoutubeUrl2 = async function (feelingMusics) {
  const connection = await pool.getConnection(async (conn) => conn);

  var YouTube = require('youtube-node');
  var youTube = new YouTube();
  var youTubeUrl = 'https://www.youtube.com/watch?v=';
  var thumbnailsImage = "";
  //youTube.setKey('AIzaSyBZp3ma4FykMG9vEjSmsm42fC8aOtUA0oQ');
  
  youTube.setKey('AIzaSyCONq4eoFv--fhsmf2C-gnbSdunHyStpSw')
  var musicId = feelingMusics[0].musicId;

  youTube.search(feelingMusics[0].musicName + " " + feelingMusics[0].singer + " MV", 2, {type: 'video', videoLicense:'youtube'},function(error, result) {
  if (error) {
      console.log(error);
  }
  else {
      //console.log(JSON.stringify(result, null, 2));
      var resultjson = result.items[0];
      console.log(resultjson.snippet.thumbnails.high.url);
      console.log(resultjson.id.videoId);
      if(resultjson.snippet.thumbnails.high.url){
          thumbnailsImage = resultjson.snippet.thumbnails.high.url;
      } else {
          thumbnailsImage = "";
      }
      if(resultjson.id.videoId){
          youTubeUrl += resultjson.id.videoId;
      } else {
          youTubeUrl = "";
      }
      
      feelingMusics[0].youtubeUrl = youTubeUrl;
      feelingMusics[0].imageUrl = thumbnailsImage;

  }
});
    setTimeout(async function(){
       //console.log(weatherMusics);
       await musicService.updateYoutubeInfo(musicId, youTubeUrl, thumbnailsImage);
       connection.release();
       return feelingMusics;
    
    }, 3000);
}

exports.settingRecommend2 = async function (type, feel, feelingMusics) {
  const connection = await pool.getConnection(async (conn) => conn);
  
  var musicId = feelingMusics[0].musicId;
  console.log(type, feel, musicId);

  const [checkRecommend] = await musicDao.existRecommend2(connection);
  console.log(checkRecommend);

  // 오늘의 Recommend에 저장된게 없으면 -------수정
  if (checkRecommend.exist == 0) {
      const addRecommend = await musicService.setRecommend2(type, feel, musicId);
  } else {
      const updateRecommend = await musicService.updateRecommend2(type, feel, musicId);
  }
  console.log("done!");

  connection.release();

  return;
}
// 날씨 + 음악별 노래 조회 
exports.retrieveMusicList1 = async function (year, mon, day) {
  const connection = await pool.getConnection(async (conn) => conn);
  const [musicResult] = await musicDao.retrieveMusicList1(connection, year, mon, day);

  connection.release();

  return musicResult;
}
exports.retrieveMusicList2 = async function (year, mon, day) {
  const connection = await pool.getConnection(async (conn) => conn);
  const [musicResult] = await musicDao.retrieveMusicList2(connection, year, mon, day);

  connection.release();

  return musicResult;
}

exports.retrieveTotalGetChart = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const [musicResult] = await musicDao.getTotalChart(connection);

  connection.release();

  return musicResult;
}

// 플레이리스트
exports.existPlaylist = async function (recomId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const existResult = await musicDao.existPlaylist(connection, recomId);
  connection.release();

  return existResult;
}


exports.likeStatus = async function (recomId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const statusResult = await musicDao.getLikeStatus(connection, recomId);
  connection.release();

  return statusResult;
};

exports.existRecommend = async function (recomId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const statusResult = await musicDao.existRecommendd(connection, recomId);
  connection.release();

  return statusResult;
};