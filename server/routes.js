import * as express from 'express';
import DB from './db';

const router = express.Router();

router.get('/api/blogs', async (req, res) => {
  try {
    let temperatures = await DB.Temperatures.all();
    res.json(temperatures);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

})

export default router;