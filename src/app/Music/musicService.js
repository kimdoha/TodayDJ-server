const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const musicProvider = require("./musicProvider");
const musicDao = require("./musicDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

// exports.createUser = async function (email, password, nickname) {
//     try {
//         // 이메일 중복 확인
//         const emailRows = await musicProvider.emailCheck(email);
//         if (emailRows.length > 0)
//             return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

//         // 비밀번호 암호화
//         const hashedPassword = await crypto
//             .createHash("sha512")
//             .update(password)
//             .digest("hex");

//         const insertUserInfoParams = [email, hashedPassword, nickname];

//         const connection = await pool.getConnection(async (conn) => conn);

//         const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
//         console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
//         connection.release();
//         return response(baseResponse.SUCCESS);


//     } catch (err) {
//         logger.error(`App - createUser Service error\n: ${err.message}`);
//         return errResponse(baseResponse.DB_ERROR);
//     }
// };

// 폴더 생성
exports.setFolder = async function (folderId, folderName) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const folderResult = await musicDao.addFolder(connection, folderId, folderName);
        console.log(`추가된 회원 : ${folderResult.insertId}`)
        connection.release();
        return response({ "isSuccess": true, "code": 1000, "message":"폴더 추가되었습니다." },{ "folderId": folderId, "followName": folderName });

    } catch (err) {
        logger.error(`App - SetFolder Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 폴더 삭제
exports.deleteFolder = async function (folderId, folderName) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const folderResult = await musicDao.folderDelete(connection, folderId, folderName);
        console.log(`추가된 회원 : ${folderResult.insertId}`)
        connection.release();
        return response({ "isSuccess": true, "code": 1000, "message":"폴더 삭제되었습니다." }, { "folderId": folderId, "followName": folderName });

    } catch (err) {
        logger.error(`App - DeleteFolder Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 팔로잉 업데이트
exports.updateFolder = async function (folderId, folderName) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const folderResult = await musicDao.updateFolder(connection, folderId, folderName);
        console.log(`추가된 회원 : ${folderResult.insertId}`)
        connection.release();
        return response({ "isSuccess": true, "code": 1000, "message":"폴더 추가되었습니다." }, { "folderId": folderId, "followName": folderName });

    } catch (err) {
        logger.error(`App - UpdateFolder Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 날씨 설정
exports.setWeather = async function (weatherName, area) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const weatherResult = await musicDao.setWeather(connection, weatherName, area);
        console.log(`추가된 회원 : ${weatherResult.insertId}`)
        connection.release();
        return;

    } catch (err) {
        logger.error(`App - SetWeather Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updateWeather = async function (weatherName, area) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const weatherResult = await musicDao.updateWeather(connection, weatherName, area);
        console.log(`추가된 회원 : ${weatherResult.insertId}`)
        connection.release();
        return;

    } catch (err) {
        logger.error(`App - UpdateWeather Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 기분 저장
exports.setFeeling= async function (feelNum) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const feelResult = await musicDao.setFeeling(connection, feelNum);
        console.log(`추가된 회원 : ${feelResult.insertId}`)
        connection.release();
        return response({ "isSuccess": true, "code": 1000, "message":"기분 저장 성공!" }, { "feelingId": feelNum });

    } catch (err) {
        logger.error(`App - SetFeeling Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updateFeeling = async function (feelNum) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const feelResult = await musicDao.updateFeeling(connection, feelNum);
        console.log(`추가된 회원 : ${feelResult.insertId}`)
        connection.release();
        return response({ "isSuccess": true, "code": 1000, "message":"기분 업뎃 성공!" }, { "feelingId": feelNum });

    } catch (err) {
        logger.error(`App - UpdateFeeling Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// 개인 정보 저장 
exports.setType= async function (type1, type2) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const userResult = await musicDao.setType(connection, type1, type2);
        console.log(`추가된 회원 : ${userResult.insertId}`)
        connection.release();
        return response({ "isSuccess": true, "code": 1000, "message":"사용자 타입 저장 성공" }, { "type1": type1, "type2":type2 });

    } catch (err) {
        logger.error(`App - SetType Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.updateType = async function (type1, type2) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const userResult = await musicDao.updateType(connection, type1, type2);
        console.log(`추가된 회원 : ${userResult.insertId}`)
        connection.release();
        return response({ "isSuccess": true, "code": 1000, "message":"사용자 타입 저장 성공" }, { "type1": type1, "type2":type2 });

    } catch (err) {
        logger.error(`App - UpdateType Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.setRecommend = async function (type, weath, musicId){
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const recommendResult = await musicDao.setRecommend(connection, type, weath, musicId);
        console.log(`추가된 회원 : ${recommendResult.insertId}`)
        connection.release();
        return;

    } catch (err) {
        logger.error(`App - SetRecommend Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updateRecommend = async function (type, weath, musicId){
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const recommendResult = await musicDao.updateRecommend(connection, type, weath, musicId);
        console.log(`추가된 회원 : ${recommendResult.insertId}`)
        connection.release();
        return;

    } catch (err) {
        logger.error(`App - UpdateRecommend Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.setRecommend2 = async function (type, feel, musicId){
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const recommendResult = await musicDao.setRecommend2(connection, type, feel, musicId);
        console.log(`추가된 회원 : ${recommendResult.insertId}`)
        connection.release();
        return;

    } catch (err) {
        logger.error(`App - SetRecommend2 Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updateRecommend2 = async function (type, feel, musicId){
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const recommendResult = await musicDao.updateRecommend2(connection, type, feel, musicId);
        console.log(`추가된 회원 : ${recommendResult.insertId}`)
        connection.release();
        return;

    } catch (err) {
        logger.error(`App - UpdateRecommend2 Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updateYoutubeInfo = async function (musicId, youtubeUrl, imageUrl){
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const recommendResult = await musicDao.updateYoutubeInfo(connection, musicId, youtubeUrl, imageUrl);
        console.log(`추가된 회원 : ${recommendResult.insertId}`)
        connection.release();
        return;

    } catch (err) {
        logger.error(`App - UpdateYoutubeInfo Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 플레이리스트
exports.setPlaylist = async function (recomId) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const likeResult = await musicDao.addPlaylist(connection, recomId);
        console.log(`추가된 회원 : ${likeResult.insertId}`)
        connection.release();
        return response({ "isSuccess": true, "code": 1000, "message":"플레이리스트에 추가되었습니다." },{ "recomId": recomId });

    } catch (err) {
        logger.error(`App - SetPlaylistService error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteLike = async function (recomId) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const likeResult = await musicDao.likeDelete(connection, recomId);
        console.log(`추가된 회원 : ${likeResult.insertId}`)
        connection.release();
        return response({ "isSuccess": true, "code": 1000, "message":"플레이리스트에서 삭제되었습니다." }, { "recomId": recomId });

    } catch (err) {
        logger.error(`App - DeleteLike Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updateLike = async function (recomId) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        console.log("before");
        const likeResult = await musicDao.updateLike(connection, recomId);
        console.log(`추가된 회원 : ${likeResult.insertId}`)
        connection.release();
        return response({ "isSuccess": true, "code": 1000, "message":"플레이리스트에 추가되었습니다." }, { "recomId": recomId });

    } catch (err) {
        logger.error(`App - UpdateFolder Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};