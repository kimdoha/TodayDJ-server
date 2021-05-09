const mysql = require('mysql2/promise');
const {logger} = require('./winston');

let pool;

// TODO: 본인의 DB 계정 입력
if (process.env.NODE_ENV === 'development' ||!process.env.NODE_ENV) {

    pool = mysql.createPool({
        host: 'softsquareddb.co0bcvr0kw9t.ap-northeast-2.rds.amazonaws.com',
        user: 'minji',
        port: 3306,
        password: 'minzrring',
        database: 'together'
    });
} else if (process.env.NODE_ENV === 'production') {
    pool = mysql.createPool({
        host: 'softsquareddb.co0bcvr0kw9t.ap-northeast-2.rds.amazonaws.com',
        user: 'minji',
        port: 3306,
        password: 'minzrring',
        database: 'together'
    });
}


module.exports = {
    pool: pool
};