import React from 'react';
import '../containers/Dashboard.css';
import MeasurementsDashboard from '../containers/dashboards/MeasurementsDashboard';
import {
  fetchWeatherData,
  fetchSensorExtremes,
} from '../utils/FetchServerData';

const Weather = () => {
  const [timeSeries, setTimeSeries] = React.useState({
    temperature: [],
    humidity: [],
    pressure: [],
  });

  const handleLoadData = async (startTimeUnix) => {
    try {
      // db has unix timestamp in seconds in UTC zone
      const result = await fetchWeatherData(startTimeUnix);
      setTimeSeries(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetExtremes = async (startTimeUnix, sensor, quantity) => {
    try {
      // db has unix timestamp in seconds in UTC zone
      const result = await fetchSensorExtremes(
        startTimeUnix,
        'OUT',
        sensor,
        quantity
      );
      return new Promise((resolve, reject) => {
        resolve(result);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='App'>
      <h1>Weather</h1>
      <MeasurementsDashboard
        measurements={['temperature', 'humidity', 'pressure']}
        realDb='weather/'
        loadData={handleLoadData}
        timeSeries={timeSeries}
        showDayExtremes={true}
        getDayExtremes={handleGetExtremes}
      />
    </div>
  );
};

export default Weather;
