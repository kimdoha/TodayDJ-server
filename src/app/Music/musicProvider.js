const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

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