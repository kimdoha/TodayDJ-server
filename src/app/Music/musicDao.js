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


// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO UserInfo(email, password, nickname)
        VALUES (?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(insertUserInfoQuery, insertUserInfoParams);
  return insertUserInfoRow;
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
  retrieveFeelingMusic5
};
