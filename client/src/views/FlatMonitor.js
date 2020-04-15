import React from 'react';
import '../containers/Dashboard.css';
import TimelineDashboard from '../containers/dashboards/TimelineDashboard';
import MeasurementsDashboard from '../containers/dashboards/MeasurementsDashboard';
import { fetchFlatData } from '../utils/FetchServerData';
import MiddleTemporaryCard from '../containers/dashboards/MiddleTemporaryCard';

const FlatMonitor = () => {
  const [timeSeries, setTimeSeries] = React.useState({
    temperature: [],
    humidity: [],
  });

  async function handleLoadData(startTimeUnix) {
    try {
      const result = await fetchFlatData(startTimeUnix);
      setTimeSeries(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='App'>
      <h1>Living Room</h1>
      <MiddleTemporaryCard
        measurements={['temperature', 'humidity']}
        realDb='home/clima/temperature'
        loadData={handleLoadData}
        timeSeries={timeSeries}
      />
    </div>
  );
};

export default FlatMonitor;

{
  /* <div className='row'>
        <div className='column left-column'>
          <MeasurementsDashboard
            measurements={['temperature', 'humidity']}
            realDb='home/clima'
          />
        </div>
        <div className='column right-column'>
          <TimelineDashboard
            loadData={handleLoadData}
            timeSeries={timeSeries}
          />
        </div>
      </div> */
}
