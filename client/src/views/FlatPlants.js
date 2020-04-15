import React from 'react';
import '../containers/Dashboard.css';
import MeasurementsDashboard from '../containers/dashboards/MeasurementsDashboard';
import { fetchPlantData } from '../utils/FetchServerData';

const FlatPlants = () => {
  const plants = ['spathiphyllum'];
  const [timeSeries, setTimeSeries] = React.useState({
    spathiphyllum: [],
  });

  const handleLoadData = async (startTimeUnix) => {
    try {
      const result = await fetchPlantData(startTimeUnix, plants[0]);
      setTimeSeries(result);
    } catch (err) {
      console.log(err);
    }
  };

  // FIX ME: this db structure must be
  return (
    <div className='App'>
      <h1>Plants</h1>
      <MeasurementsDashboard
        measurements={plants.map((p) => {
          return p.toLowerCase();
        })}
        realDb='home/plants'
        loadData={handleLoadData}
        timeSeries={timeSeries}
        showDayExtremes={false}
      />
    </div>
  );
};

export default FlatPlants;
