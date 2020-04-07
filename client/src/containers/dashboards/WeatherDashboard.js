import React from 'react';
import MeasurementDashboard from './MeasurementDashboard';
import WeatherDashboardHeader from '../headers/WeatherDashboardHeader';
import '../Dashboard.css';

class WeatherDashboard extends React.Component {
  render() {
    const measurements = Object.keys(this.props.measurements).map((key, index) => {     
      return (
        <MeasurementDashboard 
          key={key+index}
          title={key}
          sensors={this.props.measurements[key]}
        />
      );
    });

    return(
      <div className="width-90">
        <WeatherDashboardHeader
          timeUpdated={this.props.updatedTime}
        />
        <div className="dashboard__column">
          {measurements}
        </div>
      </div>
    )
  }
}

export default WeatherDashboard;