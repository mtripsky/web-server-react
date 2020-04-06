import {Connection} from './index';

export const all = async () => {
  return new Promise((resolve, reject) => {
    Connection.query('SELECT * FROM temperatures', (err, results) => {
      if(err){
        console.log(err);
      }
      resolve(results);
    });
  });
}

export const allWhere = async (args) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM temperatures';
    if(args.startTime){
      sql += ` WHERE timestamp >= ${args.startTime}`;
    }
    if(args.endTime){
      sql += ` AND timestamp <= ${args.endTime}`;
    }
    if(args.sensor){
      sql += ` AND sensor = '${args.sensor}'`
    }
    if(args.location){
      sql += ` AND location = '${args.location}'`
    }
    Connection.query(sql, (err, results) => {
      if(err){
        console.log(err);
      }
      resolve(results);
    });
  });
}

export default {
  all,
  allWhere
}