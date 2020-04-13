import config from '../config/config';
import * as mysql from 'mysql';

export const Connection = mysql.createConnection(config.mysql);

Connection.connect((err) => {
  if (err) console.log(err);
  console.log('Connected to mysql db');
});

export const AllFromStartTime = async (args) => {
  return new Promise((resolve, reject) => {
    if (args.startTime) {
      let sql = `SELECT * FROM ${args.table}`;
      sql += ` WHERE timestamp >= ${args.startTime}`;

      if (args.endTime) {
        sql += ` AND timestamp <= ${args.endTime}`;
      }
      if (args.sensor) {
        sql += ` AND sensor = '${args.sensor}'`;
      }
      if (args.location) {
        sql += ` AND location = '${args.location}'`;
      }
      if (args.plant) {
        sql += ` AND plant = '${args.plant}'`;
      }
      Connection.query(sql, (err, results) => {
        if (err) {
          console.log(err);
        }
        resolve(results);
      });
    } else {
      reject(new Error('StartTime was not found in args!'));
    }
  });
};

export default {
  AllFromStartTime,
};
