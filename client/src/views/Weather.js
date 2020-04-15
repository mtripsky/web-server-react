import React from 'react';
import '../containers/Dashboard.css';
import TimelineDashboard from '../containers/dashboards/TimelineDashboard';
import MeasurementsDashboard from '../containers/dashboards/MeasurementsDashboard';
import { fetchWeatherData } from '../utils/FetchServerData';

const Weather = () => {
  const [timeSeries, setTimeSeries] = React.useState({
    temperature: [],
    humidity: [],
    pressure: [],
  });

  async function handleLoadData(startTimeUnix) {
    try {
      // db has unix timestamp in seconds in UTC zone
      const result = await fetchWeatherData(startTimeUnix);
      setTimeSeries(result);
    } catch (err) {
      console.log(err);
    }
  }

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
            loadData={handleLoadData}
            timeSeries={timeSeries}
          />
        </div>
      </div>
    </div>
  );
};

export default Weather;
