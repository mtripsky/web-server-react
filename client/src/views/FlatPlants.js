import React from 'react';
import '../containers/Dashboard.css';
import TimelineDashboard from '../containers/dashboards/TimelineDashboard';
import MeasurementsDashboard from '../containers/dashboards/MeasurementsDashboard';
import * as moment from 'moment';
import { fetchPlantData } from '../utils/FetchServerData';

class FlatPlants extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: moment()
        .add(1, 'days')
        .startOf('day')
        .format('YYYY-MM-DD HH:mm'),
      timeSeries: {
        soil_moisture: [],
      },
    };
  }

  handleLoadData = async () => {
    try {
      // db has unix timestamp in seconds in UTC zone
      const startTime = moment().startOf('day').unix();
      const result = await fetchPlantData(startTime, 'Spathiphyllum');
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
        <h1>Plants</h1>
        <div className='row'>
          <div className='column left-column'>
            <MeasurementsDashboard
              measurements={['spathiphyllum']}
              realDb='home/plants'
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

export default FlatPlants;
