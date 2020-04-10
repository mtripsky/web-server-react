import React from 'react';
import '../containers/Dashboard.css';
import TimelineDashboard from '../containers/dashboards/TimelineDashboard';
import MeasurementsDashboard from '../containers/dashboards/MeasurementsDashboard';
import { firebaseDb } from '../db/firebase';
import * as moment from 'moment';

class FlatMonitor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeline: {
        temperature: [],
        humidity: [],
      },
    };
  }

  render() {
    return (
      <div className='App'>
        <h1>Living Room</h1>
        <div className='row'>
          <div className='column left-column'>
            <MeasurementsDashboard
              measurements={['temperature', 'humidity']}
              realDb='home/clima'
              updatedTime={this.state.updatedTime}
            />
          </div>
          <div className='column right-column'>
            <TimelineDashboard timeSeries={this.state.timeline} />
          </div>
        </div>
      </div>
    );
  }
}

export default FlatMonitor;
