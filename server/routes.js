import * as express from 'express';
import DB from './db';

const router = express.Router();

router.get('/api/temperatures', async (req, res) => {
  try {
    let temperatures = await DB.AllFromStartTime({
      table: 'temperatures',
      startTime: req.query.startTime,
      endTime: req.query.endTime,
      sensor: req.query.sensor,
      location: req.query.location,
    });
    res.json(temperatures);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/api/humidities', async (req, res) => {
  try {
    let humidities = await DB.AllFromStartTime({
      table: 'humidities',
      startTime: req.query.startTime,
      endTime: req.query.endTime,
      sensor: req.query.sensor,
      location: req.query.location,
    });
    res.json(humidities);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/api/pressures', async (req, res) => {
  try {
    let pressures = await DB.AllFromStartTime({
      table: 'pressures',
      startTime: req.query.startTime,
      endTime: req.query.endTime,
      sensor: req.query.sensor,
      location: req.query.location,
    });
    res.json(pressures);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
