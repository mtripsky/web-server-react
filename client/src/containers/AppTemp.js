import React from 'react';
import './App.css';
import './Dashboard.css';
import TimelineDashboard from './TimelineDashboard';
import WeatherDashboard from './WeatherDashboard';
import {firebaseDb} from '../db/firebase';
import FetchWeatherData from '../utils/FetchWeatherTimeline';
import * as moment from 'moment';

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

  async componentWillMount() {
    const startTime = moment().utc().startOf('day').unix();
    //console.log(startTime);
    const weatherData = await FetchWeatherData.fetchWeatherData(startTime);
    //console.log(weatherData);
    this.setState({
      weatherTimeline:weatherData
    })
  }

  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 5000);
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
    //console.log(this.state.weatherTimeline);
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
