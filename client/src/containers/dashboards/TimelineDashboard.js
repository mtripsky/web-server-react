import React from 'react';
//import TimelinePlot from "../components/TimelinePlotApexChart.js";
import TimelinePlot from '../components/TimelinePlotChartJs';
import TimelineDashboardHeader from '../headers/TimelineDashboardHeader';
import {
  MapKeyToUnit,
  MapKeyToLabelString,
  MapYAxisTicks,
} from '../../utils/PlotDescriptionHelper';
import '../Dashboard.css';

const intervalInMin = 5;

class TimelineDashboard extends React.Component {
  componentDidMount() {
    this.props.loadData();
    this.fetchInterval = setInterval(
      this.props.loadData,
      intervalInMin * 60 * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  render() {
    var plots = Object.keys(this.props.timeSeries).map((key, index) => {
      return (
        <TimelinePlot
          key={key + index}
          series={this.props.timeSeries[key]}
          yAxisName={MapKeyToLabelString(key)}
          yAxisUnit={MapKeyToUnit(key)}
          xAxisStart={this.props.startTime}
          xAxisEnd={this.props.endTime}
          yAxisTicks={MapYAxisTicks(key)}
        />
      );
    });

    return (
      <div className='width-90'>
        <TimelineDashboardHeader />
        <div className='dashboard__column'>{plots}</div>
      </div>
    );
  }
}

export default TimelineDashboard;
