// import config from './config.js';
import DataBase from 'mysql2';
const config = {}
const pool = DataBase.createPool(config).promise();

const query = async function (sql) {
    const conn = await pool.getConnection();
    return conn.query(sql)
        .then(result => {
            console.log('Query results: %o', result);
            return result;
        })
        .then((r) => {
            conn.release();
            return r;
        });
};

export default query;