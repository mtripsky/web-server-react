import React from 'react';
import TimelinePlot from './TimelinePlot';
import TimelineDashboardHeader from './TimelineDashboardHeader';

class TimelineDashboard extends React.Component {
  render() {
    return (
      <div>
        <TimelineDashboardHeader />
        <TimelinePlot 
          isXaxisVissible={true}
          xAxisLegend={"Time"}
          yAxisLegend={"Temperature °C"}
          data={this.props.weatherData}
        />
      </div>
  )};
}

export default TimelineDashboard;