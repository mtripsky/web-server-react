import React from 'react';
import MeasurementsDashboard from '../containers/dashboards/MeasurementsDashboard';
import { fetchFlatData, fetchSensorExtremes } from '../utils/FetchServerData';

const FlatMonitor = () => {
  const [timeSeries, setTimeSeries] = React.useState({
    temperature: [],
    humidity: [],
  });

  const handleLoadData = async (startTimeUnix) => {
    try {
      const result = await fetchFlatData(startTimeUnix);
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
        'LR',
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
      <h1>Living Room</h1>
      <MeasurementsDashboard
        measurements={['temperature', 'humidity']}
        realDb='home/clima'
        loadData={handleLoadData}
        timeSeries={timeSeries}
        showDayExtremes={true}
        getDayExtremes={handleGetExtremes}
      />
    </div>
  );
};

export default FlatMonitor;
