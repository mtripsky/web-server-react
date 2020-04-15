import React from 'react';
import '../containers/Dashboard.css';
import TimelineDashboard from '../containers/dashboards/TimelineDashboard';
import MeasurementsDashboard from '../containers/dashboards/MeasurementsDashboard';
import { fetchPlantData } from '../utils/FetchServerData';

const FlatPlants = () => {
  const plants = ['Spathiphyllum'];
  const [timeSeries, setTimeSeries] = React.useState({
    soil_moisture: [],
  });

  async function handleLoadData(startTimeUnix) {
    try {
      const result = await fetchPlantData(startTimeUnix, plants[0]);
      setTimeSeries(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='App'>
      <h1>Plants</h1>
      <div className='row'>
        <div className='column left-column'>
          <MeasurementsDashboard
            measurements={plants.map((p) => {
              return p.toLowerCase();
            })}
            realDb='home/plants'
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

export default FlatPlants;
