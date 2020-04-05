import Firebase from 'firebase';
import config from '../config/config';

const app = Firebase.initializeApp(config.firebase);

export const firebaseDb = app.database();
