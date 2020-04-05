import config from '../config/config';
import * as mysql from 'mysql';

import Temperatures from './temperatures';

export const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
  if(err) console.log(err);
});

export default {
  Temperatures
}