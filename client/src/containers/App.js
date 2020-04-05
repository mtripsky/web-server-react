import React from 'react';
import './App.css';
import './Dashboard.css';
import TimelineDashboard from './TimelineDashboard';
import WeatherDashboard from './WeatherDashboard';
import {firebaseDb} from '../db/firebase';
const moment = require('moment');

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
