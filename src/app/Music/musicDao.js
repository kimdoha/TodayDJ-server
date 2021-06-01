// 폴더 조회
async function existFolder(connection, folderId) {
  const existQuery = `
  SELECT EXISTS(SELECT folderId 
    FROM Folder WHERE folderId = ?) AS exist;
                `;
  const [existRows] = await connection.query(existQuery, folderId);
  return existRows;
}

// 폴더 상태
async function getFolderStatus(connection, folderId) {
  const statusQuery = `
    SELECT status FROM Folder WHERE folderId = ?;
                `;
  const [statusRows] = await connection.query(statusQuery, folderId);
  return statusRows;
}

// 폴더 생성 
async function addFolder(connection, folderId, folderName) {
  const addFolderQuery = `
  INSERT INTO Folder(folderId, folderName) VALUES (?, ?);
                 `;
  const [folderRow] = await connection.query(addFolderQuery, [folderId, folderName]);
  return folderRow;
}

// 폴더 삭제 
async function folderDelete(connection, folderId, folderName) {
  const deleteFolderQuery = `
  UPDATE Folder SET status = 0 WHERE folderId = ? AND folderName = ?;
                 `;
  const [folderRow] = await connection.query(deleteFolderQuery, [folderId, folderName]);
  return folderRow;
}

// 폴더 추가
async function updateFolder(connection, folderId, folderName) {
  const updateFolderQuery = `
  UPDATE Folder SET status = 1 WHERE folderId = ? AND folderName = ?;
      `;
  const [folderRow] = await connection.query(updateFolderQuery, [folderId, folderName]);
  return folderRow;
}

// 오늘의 날씨 조회
async function existWeather(connection) {
  const existQuery = `
  SELECT EXISTS(SELECT * FROM Weather WHERE DATE(createAt) = CURRENT_DATE) AS exist;
    `;
  const [existRows] = await connection.query(existQuery);
  return existRows;
}

// 날씨 설정
async function setWeather(connection, weatherName, area) {
  const addWeatherquery = `
      INSERT INTO Weather(weather, area) VALUES (?, ?);
      `;
  const [weatherRow] = await connection.query(addWeatherquery, [weatherName, area]);
  return weatherRow;
}

async function updateWeather(connection, weatherName, area) {
  const updateWeatherquery = `
      UPDATE Weather SET weather = ? , area = ? 
      WHERE DATE(createAt) = CURRENT_DATE();
      `;
  const [weatherRow] = await connection.query(updateWeatherquery , [weatherName, area]);
  return weatherRow;
}

async function existFeeling(connection) {
  const existQuery = `
      SELECT EXISTS(SELECT * FROM Feeling WHERE DATE(createAt) = CURRENT_DATE) AS exist;
    `;
  const [existRows] = await connection.query(existQuery);
  return existRows;
}

// 날씨 설정
async function setFeeling(connection, feelNum) {
  const addFeelingquery = `
    INSERT INTO Feeling(feeling) VALUES (?);
      `;
  const [feelingRow] = await connection.query(addFeelingquery, feelNum);
  return feelingRow;
}

async function updateFeeling(connection, feelNum) {
  const updateFeelingquery = `
  UPDATE Feeling SET feeling = ? WHERE DATE(createAt) = CURRENT_DATE();
      `;
  const [FeelingRow] = await connection.query(updateFeelingquery, feelNum);
  return FeelingRow;
}

// User 정보 
async function existUser(connection) {
  const existQuery = `
  SELECT EXISTS(SELECT * FROM User);
    `;
  const [existRows] = await connection.query(existQuery);
  return existRows;
}

// User 설정
async function setType(connection, type1, type2) {
  const addTypequery = `
  INSERT INTO User(sadType1, angryType2) VALUES (?, ?);
      `;
  const [typeRow] = await connection.query(addTypequery, [type1, type2]);
  return typeRow;
}

async function updateType(connection, type1, type2) {
  const updateTypequery = `
    UPDATE User SET sadType1 = ?, angryType2 = ?;
      `;
  const [typeRow] = await connection.query(updateTypequery, [type1, type2]);
  return typeRow;
}

// feeling
async function retrieveFeeling(connection) {
  const feelingquery = `
  SELECT feeling FROM Feeling WHERE DATE(createAt) = CURRENT_DATE();
      `;
  const [feelingRow] = await connection.query(feelingquery);
  return feelingRow;
}

async function retrieveFeelingMusics1(connection) {
  const feelingquery = `
  SELECT * FROM Music WHERE genre IN ('아이돌' ,'댄스팝' ,'랩힙합', '인디', '포크어쿠스틱')
                      AND musicId NOT IN (SELECT DISTINCT musicId FROM Recommend)
  ORDER BY RAND()
  LIMIT 1;
      `;
  const [feelingRow] = await connection.query(feelingquery);
  return feelingRow;
}
async function retrieveFeelingMusics2(connection) {
  const feelingquery = `
  SELECT * FROM Music WHERE genre IN ('알앤비소울' ,'발라드' , '인디', '포크어쿠스틱')
                      AND musicId NOT IN (SELECT DISTINCT musicId FROM Recommend)
  ORDER BY RAND()
  LIMIT 1;

      `;
  const [feelingRow] = await connection.query(feelingquery);
  return feelingRow;
}
async function retrieveFeelingMusics3(connection) {
  const feelingquery = `
  SELECT * FROM Music WHERE genre IN ('알앤비소울' ,'발라드' , '재즈')
  AND musicId NOT IN (SELECT DISTINCT musicId FROM Recommend)
  ORDER BY RAND()
  LIMIT 1;

      `;
  const [feelingRow] = await connection.query(feelingquery);
  return feelingRow;
}
async function retrieveFeelingMusics4(connection) {
  const feelingquery = `
  SELECT * FROM Music WHERE genre IN ('아이돌' ,'댄스팝' ,'랩힙합', '인디', '포크어쿠스틱')
                      AND musicId NOT IN (SELECT DISTINCT musicId FROM Recommend)
  ORDER BY RAND()
  LIMIT 1;
      `;
  const [feelingRow] = await connection.query(feelingquery);
  return feelingRow;
}

async function retrieveSadType(connection) {
  const sadquery = `
    SELECT sadType1 FROM User;
      `;
  const [sadRow] = await connection.query(sadquery);
  return sadRow;
}

async function retrieveAngryType(connection) {
  const angryquery = `
      SELECT angryType2 FROM User;
      `;
  const [angryRow] = await connection.query(angryquery);
  return angryRow;
}

async function retrieveFeelingMusic5(connection) {
  const feelingquery = `
  SELECT * FROM Music WHERE genre IN ('락메탈' ,'일렉트로닉')
  AND musicId NOT IN (SELECT DISTINCT musicId FROM Recommend)
  ORDER BY RAND()
  LIMIT 1;
      `;
  const [feelingRow] = await connection.query(feelingquery);
  return feelingRow;
}

async function retrieveWeather(connection) {
  const weatherquery = `
      SELECT weather FROM Weather WHERE DATE(createAt) = CURRENT_DATE;
      `;
  const [weatherRow] = await connection.query(weatherquery);
  return weatherRow;
}

async function retrieveWeatherMusic1(connection) {
  const weatherquery = `
    SELECT * FROM Music WHERE genre IN ('알앤비소울' ,'발라드', '재즈')
    AND musicId NOT IN (SELECT DISTINCT musicId FROM Recommend)
    ORDER BY RAND()
    LIMIT 1;
      `;
  const [weatherRow] = await connection.query(weatherquery);
  return weatherRow;
}

async function retrieveWeatherMusic2(connection) {
  const weatherquery = `
    SELECT * FROM Music WHERE genre IN ('일렉트로닉' ,'락메탈')
    AND musicId NOT IN (SELECT DISTINCT musicId FROM Recommend)
    ORDER BY RAND()
    LIMIT 1;
      `;
  const [weatherRow] = await connection.query(weatherquery);
  return weatherRow;
}

async function retrieveWeatherMusic3(connection) {
  const weatherquery = `
    SELECT * FROM Music WHERE genre IN ('인디' ,'포크어쿠스틱')
    AND musicId NOT IN (SELECT DISTINCT musicId FROM Recommend)
    ORDER BY RAND()
    LIMIT 1;
      `;
  const [weatherRow] = await connection.query(weatherquery);
  return weatherRow;
}

async function retrieveWeatherMusic4(connection) {
  const weatherquery = `
  SELECT * FROM Music WHERE genre IN ('아이돌','댄스팝','랩힙합','인디','포크어쿠스틱','알앤비소울')
  AND musicId NOT IN (SELECT DISTINCT musicId FROM Recommend)
  ORDER BY RAND()
  LIMIT 1;
      `;
  const [weatherRow] = await connection.query(weatherquery);
  return weatherRow;
}

async function existRecommend(connection) {
  const existQuery = `
  SELECT EXISTS(SELECT * FROM Recommend WHERE DATE(createAt) = CURRENT_DATE AND type = 0) AS exist;
    `;
  const [existRows] = await connection.query(existQuery);
  return existRows;
}

// 추천
async function setRecommend(connection, type, weath, musicId) {
  const recommendQuery = `
  INSERT INTO Recommend(musicId, type, weather) VALUES(?, ?, ?);
    `;
  const [setRows] = await connection.query(recommendQuery, [musicId,type, weath]);
  return setRows;
}

async function updateRecommend(connection, type, weath, musicId) {
  const recommendQuery = `
  UPDATE Recommend SET musicId = ?, type = ? , weather = ? WHERE DATE(createAt) = CURRENT_DATE() AND feeling IS NULL;
    `;
  const [setRows] = await connection.query(recommendQuery, [musicId, type, weath]);
  return setRows;
}

// 기분에 따른 날씨 추천
async function existRecommend2(connection) {
  const existQuery = `
  SELECT EXISTS(SELECT * FROM Recommend WHERE DATE(createAt) = CURRENT_DATE AND type = 1) AS exist;
    `;
  const [existRows] = await connection.query(existQuery);
  return existRows;
}

async function setRecommend2(connection, type, feel, musicId) {
  const recommendQuery = `
      INSERT INTO Recommend(musicId, type, feeling) VALUES(?, ?, ?);
    `;
  const [setRows] = await connection.query(recommendQuery, [musicId, type, feel]);
  return setRows;
}

async function updateRecommend2(connection, type, feel, musicId) {
  const recommendQuery = `
      UPDATE Recommend SET musicId = ?, type = ? , feeling = ? WHERE DATE(createAt) = CURRENT_DATE() AND weather IS NULL;
    `;
  const [setRows] = await connection.query(recommendQuery, [musicId, type, feel]);
  return setRows;
}
// 날씨 + 기분별 음악 조회
async function retrieveMusicList1(connection, year, mon, day) {
  const existQuery = `
  SELECT recomId, M.musicId, musicName, singer, genre, weather, feeling, imageUrl, youtubeUrl
  FROM Recommend r
  LEFT OUTER JOIN Music M on r.musicId = M.musicId
    WHERE YEAR(createAt) = ? AND MONTH(createAt) = ? AND DAYOFMONTH(createAt) = ? AND type = 0;
    `;
  const [existRows] = await connection.query(existQuery, [year, mon, day]);
  return existRows;
}

async function retrieveMusicList2(connection, year, mon, day) {
  const existQuery = `
  SELECT recomId, M.musicId, musicName, singer, genre, weather, feeling, imageUrl, youtubeUrl
  FROM Recommend r
  LEFT OUTER JOIN Music M on r.musicId = M.musicId
    WHERE YEAR(createAt) = ? AND MONTH(createAt) = ? AND DAYOFMONTH(createAt) = ? AND type = 1;
    `;
  const [existRows] = await connection.query(existQuery, [year, mon, day]);
  return existRows;
}

async function getChart(connection, month) {
  const existQuery = `
  SELECT (SELECT IFNULL((ROUND(COUNT(*) / (SELECT COUNT(*) FROM Recommend WHERE weather IS NULL AND MONTH(createAt) = ?),2)),0) FROM Recommend
  WHERE feeling = 1 AND MONTH(createAt) = ?) AS percentage1, (SELECT IFNULL((ROUND(COUNT(*) / (SELECT COUNT(*) FROM Recommend WHERE weather IS NULL AND MONTH(createAt) = ?),2)),0)  FROM Recommend
  WHERE feeling = 2 AND MONTH(createAt) = ?) AS percentage2, (SELECT IFNULL((ROUND(COUNT(*) / (SELECT COUNT(*) FROM Recommend WHERE weather IS NULL AND MONTH(createAt) = ?),2)),0)  FROM Recommend
  WHERE feeling = 3 AND MONTH(createAt) = ?) AS percentage3,(SELECT IFNULL((ROUND(COUNT(*) / (SELECT COUNT(*) FROM Recommend WHERE weather IS NULL AND MONTH(createAt) = ?),2)),0)  FROM Recommend
  WHERE feeling = 4 AND MONTH(createAt) = ?) AS percentage4, (SELECT IFNULL((ROUND(COUNT(*) / (SELECT COUNT(*) FROM Recommend WHERE weather IS NULL AND MONTH(createAt) = ?),2)),0)  FROM Recommend
  WHERE feeling = 5 AND MONTH(createAt) = ?) AS percentage5;
    `;
  const [existRows] = await connection.query(existQuery, [month, month, month, month, month, month, month, month, month, month]);
  return existRows;
}


async function getTotalChart(connection) {
  const existQuery = `
    SELECT (SELECT (ROUND(COUNT(*) / (SELECT COUNT(*) FROM Recommend WHERE weather IS NULL ),2)) FROM Recommend
    WHERE feeling = 1 ) AS percentage1, (SELECT (ROUND(COUNT(*) / (SELECT COUNT(*) FROM Recommend WHERE weather IS NULL),2))  FROM Recommend
    WHERE feeling = 2 ) AS percentage2, (SELECT (ROUND(COUNT(*) / (SELECT COUNT(*) FROM Recommend WHERE weather IS NULL),2))  FROM Recommend
    WHERE feeling = 3 ) AS percentage3,(SELECT (ROUND(COUNT(*) / (SELECT COUNT(*) FROM Recommend WHERE weather IS NULL),2))  FROM Recommend
    WHERE feeling = 4 ) AS percentage4, (SELECT (ROUND(COUNT(*) / (SELECT COUNT(*) FROM Recommend WHERE weather IS NULL),2))  FROM Recommend
    WHERE feeling = 5 ) AS percentage5;
    `;
  const [existRows] = await connection.query(existQuery);
  return existRows;
}

async function updateYoutubeInfo(connection, musicId, youtubeUrl, imageUrl) {
  const existQuery = `
    UPDATE Music SET youtubeUrl = ?, imageUrl = ? WHERE musicId = ?;
    `;
  const [existRows] = await connection.query(existQuery, [youtubeUrl, imageUrl, musicId ]);
  return existRows;
}

// 플레이리스트
async function existPlaylist(connection, recomId) {
  const existQuery = `
    SELECT EXISTS(SELECT recomId FROM LikeTB WHERE recomId = ?) AS exist;
  `;
  const [existRows] = await connection.query(existQuery, recomId);
  return existRows;
}

async function getLikeStatus(connection, recomId) {
  const statusQuery = `
    SELECT status FROM LikeTB WHERE recomId = ?;
                `;
  const [statusRows] = await connection.query(statusQuery, recomId);
  return statusRows;
}

async function addPlaylist(connection, recomId) {
  const addFolderQuery = `
    INSERT INTO LikeTB(recomId) VALUES (?);
                 `;
  const [folderRow] = await connection.query(addFolderQuery, recomId);
  return folderRow;
}

async function likeDelete(connection, recomId) {
  const deleteFolderQuery = `
    UPDATE LikeTB SET status = 0 WHERE recomId = ?;
    `;
  const [folderRow] = await connection.query(deleteFolderQuery, recomId);
  return folderRow;
}

async function updateLike(connection, recomId) {
  const updateFolderQuery = `
    UPDATE LikeTB SET status = 1 WHERE recomId = ?;
      `;
  const [folderRow] = await connection.query(updateFolderQuery, recomId);
  return folderRow;
}

async function existRecommendd(connection, musicId) {
  const existQuery = `
  SELECT recomId
  FROM Recommend r
  INNER JOIN Music m ON m.musicId = r.musicId
  WHERE imageUrl IS NOT NULL AND youtubeUrl IS NOT NULL
  AND m.musicId = ?;
      `;
  const [existRow] = await connection.query(existQuery, musicId);
  return existRow;
}

async function playlistfeeling(connection, num) {
  const existQuery = `
  SELECT r.musicId, feeling, musicName, singer, genre, youtubeUrl, imageUrl, DATE_FORMAT(l.createAt, "%Y-%m-%d") AS date
  FROM LikeTB l
  INNER JOIN Recommend r ON r.recomId = l.recomId
  INNER JOIN Music M on r.musicId = M.musicId
  WHERE feeling IS NOT NULL AND feeling = ?  AND l.status = 1;
      `;
  const [existRow] = await connection.query(existQuery, num);
  return existRow;
}


async function playlistWeather1(connection, num) {
  const existQuery = `
  SELECT r.musicId, feeling, musicName, singer, genre, youtubeUrl, imageUrl, DATE_FORMAT(l.createAt, "%Y-%m-%d") AS date
  FROM LikeTB l
  INNER JOIN Recommend r ON r.recomId = l.recomId
  INNER JOIN Music M on r.musicId = M.musicId
  WHERE weather IS NOT NULL AND weather IN ('thunderstorm with light rain', 'thunderstorm with rain',
                                            'light thunderstorm', 'thunderstorm with heavy rain','thunderstorm','heavy thunderstorm',
                                            'ragged thunderstorm', 'thunderstorm with light drizzle', 'thunderstorm with drizzle',
                                            'thunderstorm with heavy drizzle')  AND l.status = 1;
      `;
  const [existRow] = await connection.query(existQuery, num);
  return existRow;
}

async function playlistWeather2(connection, num) {
  const existQuery = `
  SELECT r.musicId, feeling, musicName, singer, genre, youtubeUrl, imageUrl, DATE_FORMAT(l.createAt, "%Y-%m-%d") AS date
  FROM LikeTB l
  INNER JOIN Recommend r ON r.recomId = l.recomId
  INNER JOIN Music M on r.musicId = M.musicId
  WHERE weather IS NOT NULL AND weather IN ('light intensity drizzle', 'drizzle', 'light intensity drizzle rain','drizzle rain',
               'heavy intensity drizzle','heavy intensity drizzle rain','shower rain and drizzle', 'heavy shower rain and drizzle', 'shower drizzle')  AND l.status = 1;
      `;
  const [existRow] = await connection.query(existQuery, num);
  return existRow;
}

async function playlistWeather3(connection, num) {
  const existQuery = `
  SELECT r.musicId, feeling, musicName, singer, genre, youtubeUrl, imageUrl, DATE_FORMAT(l.createAt, "%Y-%m-%d") AS date
  FROM LikeTB l
  INNER JOIN Recommend r ON r.recomId = l.recomId
  INNER JOIN Music M on r.musicId = M.musicId
  WHERE weather IS NOT NULL AND weather IN ('light rain', 'moderate rain', 'light intensity drizzle rain','light intensity shower rain',
                                           'heavy intensity rain','very heavy rain','extreme rain', 'freezing rain', 'shower drizzle', 
                                            'shower rain', 'heavy intensity shower rain', 'ragged shower rain')  AND l.status = 1;
      `;
  const [existRow] = await connection.query(existQuery, num);
  return existRow;
}

async function playlistWeather4(connection, num) {
  const existQuery = `
  SELECT r.musicId, feeling, musicName, singer, genre, youtubeUrl, imageUrl, DATE_FORMAT(l.createAt, "%Y-%m-%d") AS date
  FROM LikeTB l
  INNER JOIN Recommend r ON r.recomId = l.recomId
  INNER JOIN Music M on r.musicId = M.musicId
  WHERE weather IS NOT NULL AND weather IN ('light snow', 'Snow', 'Sleet', 'Light shower sleet', 'Light rain and snow', 'Light shower snow',
                                           'Heavy snow', 'Shower sleet', 'Rain and snow', 'shower drizzle', 'Shower snow', 'Heavy shower snow')  AND l.status = 1;
      `;
  const [existRow] = await connection.query(existQuery, num);
  return existRow;
}

async function playlistWeather5(connection, num) {
  const existQuery = `
  SELECT r.musicId, feeling, musicName, singer, genre, youtubeUrl, imageUrl, DATE_FORMAT(l.createAt, "%Y-%m-%d") AS date
  FROM LikeTB l
  INNER JOIN Recommend r ON r.recomId = l.recomId
  INNER JOIN Music M on r.musicId = M.musicId
  WHERE weather IS NOT NULL AND weather IN ('mist', 'Smoke', 'Haze', 'Light', 'sand/ dust whirls', 'fog', 'sand', 'dust',
             'volcanic ash', 'squalls', 'tornado')  AND l.status = 1;
      `;
  const [existRow] = await connection.query(existQuery, num);
  return existRow;
}

async function playlistWeather6(connection, num) {
  const existQuery = `
  SELECT r.musicId, feeling, musicName, singer, genre, youtubeUrl, imageUrl, DATE_FORMAT(l.createAt, "%Y-%m-%d") AS date
  FROM LikeTB l
  INNER JOIN Recommend r ON r.recomId = l.recomId
  INNER JOIN Music M on r.musicId = M.musicId
  WHERE weather IS NOT NULL AND weather IN ('clear sky')  AND l.status = 1;
      `;
  const [existRow] = await connection.query(existQuery, num);
  return existRow;
}

async function playlistWeather7(connection, num) {
  const existQuery = `
  SELECT r.musicId, feeling, musicName, singer, genre, youtubeUrl, imageUrl, DATE_FORMAT(l.createAt, "%Y-%m-%d") AS date
  FROM LikeTB l
  INNER JOIN Recommend r ON r.recomId = l.recomId
  INNER JOIN Music M on r.musicId = M.musicId
  WHERE weather IS NOT NULL AND weather IN ('few clouds', 'scattered clouds','broken clouds', 'overcast clouds') AND l.status = 1;
      `;
  const [existRow] = await connection.query(existQuery, num);
  return existRow;
}

async function playlistTotal(connection) {
  const existQuery = `
  SELECT r.musicId, musicName, singer, genre, youtubeUrl, imageUrl, DATE_FORMAT(l.createAt, "%Y-%m-%d") AS date
  FROM LikeTB l
  INNER JOIN Recommend r ON r.recomId = l.recomId
  INNER JOIN Music M on r.musicId = M.musicId
  WHERE l.status = 1;
      `;
  const [existRow] = await connection.query(existQuery);
  return existRow;
}

async function isExistWeatherMusic(connection) {
  const existQuery = `
  SELECT EXISTS(SELECT *
    FROM LikeTB l
    INNER JOIN Recommend R on l.recomId = R.recomId
    WHERE DATE(l.createAt) = CURRENT_DATE AND type = 0 ) AS exist;
                `;
  const [existRows] = await connection.query(existQuery);
  return existRows;
}


async function isExistFeelingMusic(connection) {
  const existQuery = `
  SELECT EXISTS(SELECT *
    FROM LikeTB l
    INNER JOIN Recommend R on l.recomId = R.recomId
    WHERE DATE(l.createAt) = CURRENT_DATE AND type = 1 ) AS exist;
                `;
  const [existRows] = await connection.query(existQuery);
  return existRows;
}


module.exports = {
  existFolder,
  getFolderStatus,
  addFolder,
  folderDelete,
  updateFolder,
  existWeather,
  setWeather,
  updateWeather,
  existFeeling,
  setFeeling,
  updateFeeling,
  existUser,
  setType,
  updateType,
  retrieveFeeling,
  retrieveFeelingMusics1,
  retrieveFeelingMusics2,
  retrieveFeelingMusics3,
  retrieveFeelingMusics4,
  retrieveSadType,
  retrieveAngryType,
  retrieveFeelingMusic5,
  retrieveWeather,
  retrieveWeatherMusic1,
  retrieveWeatherMusic2,
  retrieveWeatherMusic3,
  retrieveWeatherMusic4,
  existRecommend,
  setRecommend,
  updateRecommend,
  existRecommend2,
  setRecommend2,
  updateRecommend2,
  retrieveMusicList1,
  retrieveMusicList2,
  getChart,
  getTotalChart,
  updateYoutubeInfo,
  existPlaylist,
  getLikeStatus,
  addPlaylist,
  likeDelete,
  updateLike,
  existRecommendd,
  playlistfeeling,
  playlistWeather1,
  playlistWeather2,
  playlistWeather3,
  playlistWeather4,
  playlistWeather5,
  playlistWeather6,
  playlistWeather7,
  playlistTotal,
  isExistWeatherMusic,
  isExistFeelingMusic

};
