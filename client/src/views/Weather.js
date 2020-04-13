import React from 'react';
import '../containers/Dashboard.css';
import TimelineDashboard from '../containers/dashboards/TimelineDashboard';
import MeasurementsDashboard from '../containers/dashboards/MeasurementsDashboard';
import { fetchWeatherData } from '../utils/FetchServerData';
import * as moment from 'moment';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: moment()
        .add(1, 'days')
        .startOf('day')
        .format('YYYY-MM-DD HH:mm'),
      timeSeries: {
        temperature: [],
        humidity: [],
        pressure: [],
      },
    };
  }

  handleLoadData = async () => {
    try {
      // db has unix timestamp in seconds in UTC zone
      const startTime = moment().startOf('day').unix();
      const result = await fetchWeatherData(startTime);
      this.setState({
        timeSeries: result,
        startTime: moment().startOf('day').format('YYYY-MM-DD HH:mm'),
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className='App'>
        <h1>Weather</h1>
        <div className='row'>
          <div className='column left-column'>
            <MeasurementsDashboard
              measurements={['temperature', 'humidity', 'pressure']}
              realDb='weather/'
            />
          </div>
          <div className='column right-column'>
            <TimelineDashboard
              loadData={this.handleLoadData}
              timeSeries={this.state.timeSeries}
              startTime={this.state.startTime}
              endTime={this.state.endTime}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
