import React from 'react';
import './App.css';
import './Dashboard.css';
import TimelineDashboard from './TimelineDashboard';
import WeatherDashboard from './WeatherDashboard';
import {firebaseDb, firestoreDb} from '../dbConfig';
const moment = require('moment');
// const db = require('../dbConfig');
// const firebaseDb = db.firebaseDb;


function getTodayData(collectionName) {
  const todayStart = moment().startOf('day').unix();
  let query = firestoreDb.collection(collectionName).where('timeStamp', '>=', todayStart);
  let series = [];
  return query.orderBy('timeStamp', 'asc').get()
    .then(querySnapshot => {
      querySnapshot
        .forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          series.push({x:data.timeStamp, y:data.value})
        });
    
      return series;
    }).then(data => {
      return getRunningAverageTimeline(data, 5);
    });
}

function getRunningAverageTimeline(data, n) {
  let result = [];
  let sumX = 0;
  let sumY = 0;
  for(var i = 0; i < data.length; ++i)
  {
    sumX += data[i].x;
    sumY += data[i].y;
    if( (i+1)%n === 0)
    {
      result.push({
        x:Math.round(sumX/n), 
        y:roundToTwo(sumY/n)});
      sumX = 0;
      sumY = 0;
    }
  }

  if(sumX !== 0)
  {
    result.push({
      x:Math.round(sumX/(data.length%n)), 
      y:roundToTwo(sumY/(data.length%n))});
  }

  return result;
}

function roundToTwo(num) {    
  return +(Math.round(num + "e+2")  + "e-2");
}

function getWeatherMeasurement(state) {
  const promise_dht11_temperature = getTodayData('dht11_weather_temperature');
  const promise_bme280_temperature = getTodayData('bme280_weather_temperature');
  const promise_dht11_humidity = getTodayData('dht11_weather_humidity');
  const promise_bme280_humidity = getTodayData('bme280_weather_humidity');
  const promise_bme280_pressure = getTodayData('bme280_weather_pressure');

  Promise.all([
      promise_dht11_temperature, 
      promise_bme280_temperature,
      promise_dht11_humidity,
      promise_bme280_humidity,
      promise_bme280_pressure])
    .then(function(data) {
    //console.log(data);
    })
    .catch(err => {
      console.log(err);
    });


  // return {
  //   "temperature":[
  //     {
  //       name:"DHT11",
  //       data: getTodayData('dht11_weather_temperature')
  //     },
  //     {
  //       name:"BME280",
  //       data: getTodayData('bme280_weather_temperature')
  //     }
  //   ],
  //   "humidity":[
  //     {
  //       name:"DHT11",
  //       data: getTodayData('dht11_weather_humidity')
  //     },
  //     {
  //       name:"BME280",
  //       data: getTodayData('bme280_weather_humidity')
  //     }
  //   ],
  //   "pressure":[
  //     {
  //       name:"BME280",
  //       data: getTodayData('bme280_weather_pressure')
  //     }
  //   ]
  // }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      measurements: {
        "temperature":[],
        "humidity":[],
        "pressure":[]
      },
      updatedTime:null,
      weatherTimeline:{
        "temperature":[],
        "humidity":[],
        "pressure":[]
      }
    };
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  componentDidMount() {
    // this.forceUpdateInterval = setInterval(() => {
    //   const data = getWeatherMeasurement();
    //   console.log(data)
    //   this.setState({
    //     weatherTimeline:data
    //   })
    //   this.forceUpdate()
    // }, 5*60*1000, true); // 5min interval
    this.forceUpdateInterval = setInterval(() => {
        const data = getWeatherMeasurement(this.state);
        //console.log(data)
        // this.setState({
        //   weatherTimeline:data
        // });
        this.forceUpdate();
      }, 1*60*1000); // 5min interval

    var weatherRef = firebaseDb.ref('weather');
    let measurementUpdates= {
      "temperature":[],
      "humidity":[],
      "pressure":[]
    };
    let lastUpdatedTime = null;

    weatherRef.once('value', snapshot => {
        snapshot.forEach((child) => {
          if(child.key !== 'dew-point')
          {
            let sensors = [];
            child.forEach(c => {
              sensors.push(
              {
                name: c.key, 
                value:c.child('value').val(), 
                unit:c.child('unit').val()
              });
              lastUpdatedTime = moment.unix(c.child('timeStamp').val()).format("YYYY-MM-DD HH:mm:ss");
            })
            measurementUpdates[child.key] = sensors;
          }
        });
      
      this.setState({
        measurements:measurementUpdates,
        updatedTime:lastUpdatedTime
      })
    });

    weatherRef.on('child_changed', snapshot => {
      if(snapshot.key !== 'dew-point')
      {
       let sensors = [];
       snapshot.forEach((child) => {
         sensors.push(
           {
             name: child.key, 
             value:child.child('value').val(), 
              unit:child.child('unit').val()
            });
            lastUpdatedTime = moment.unix(child.child('timeStamp').val()).format("YYYY-MM-DD HH:mm:ss");
        })
        measurementUpdates[snapshot.key] = sensors;
      }
      
      this.setState({
        measurements:measurementUpdates,
        updatedTime:lastUpdatedTime
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="column left-column">
            <WeatherDashboard
              measurements={this.state.measurements}
              updatedTime={this.state.updatedTime}
            />
          </div>
          <div className="column right-column">
            <TimelineDashboard
              timeSeries={this.state.weatherTimeline}
            />
          </div>
        </div>
      </div>
  )};
}

export default App;
