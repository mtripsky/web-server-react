import * as moment from 'moment';

export const fetchWeatherData = async(startTime) => {
  //console.log(moment.unix(startTime).format('YYYY-MM-DD HH:mm'));
  let r = await fetch(`/api/temperatures?startTime=${startTime}&location=OUT`);
  let temperatures = await r.json();
  //console.log(temperatures);

  return {
    "temperature":[
      {
        name:'DHT11',
        data: temperatures.filter((measurement) => {
          return measurement.sensor === 'DHT11';
        }).map((measurement) => {
          //console.log(measurement.timestamp);
          return {
            x:moment.unix(measurement.timestamp).format('YYYY-MM-DD HH:mm'), 
            y:measurement.value};
        })
      },
      {
        name:'BME280',
        data: temperatures.filter((measurement) => {
          return measurement.sensor === 'BME280';
        }).map((measurement) => {
          //console.log(measurement.timestamp);
          return {
            x:moment.unix(measurement.timestamp).format('YYYY-MM-DD HH:mm'), 
            y:measurement.value};
        })
      }
    ],
    "humidity":[],
    "pressure":[]
  }

}

export default {
  fetchWeatherData
}