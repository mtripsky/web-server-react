import React from 'react';
import '../containers/Dashboard.css';
import TimelineDashboard from '../containers/dashboards/TimelineDashboard';
import MeasurementsDashboard from '../containers/dashboards/MeasurementsDashboard';
import { firebaseDb } from '../db/firebase';
import * as moment from 'moment';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherTimeline: {
        temperature: [],
        humidity: [],
        pressure: [],
      },
    };
  }

  render() {
    return (
      <div className='App'>
        <h1>Weather</h1>
        <div className='row'>
          <div className='column left-column'>
            <MeasurementsDashboard
              measurements={['temperature', 'humidity', 'pressure']}
              realDb='weather/'
              updatedTime={this.state.updatedTime}
            />
          </div>
          <div className='column right-column'>
            <TimelineDashboard timeSeries={this.state.weatherTimeline} />
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
