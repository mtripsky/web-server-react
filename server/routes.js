import * as express from 'express';
import DB from './db';

const router = express.Router();

// router.get('/api/temperatures', async (req, res) => {
//   try {
//     let temperatures = await DB.Temperatures.all();
//     res.json(temperatures);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// })

router.get('/api/temperatures', async (req, res) => {
  try {
    let startTime = req.query.startTime;
    let endTime = req.query.endTime;
    let sensor = req.query.sensor;
    let location = req.query.location;

    let temperatures = await DB.Temperatures
      .allWhere({
        startTime: startTime, 
        sensor:sensor,
        location:location,
        endTime:endTime});
    res.json(temperatures);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

export default router;