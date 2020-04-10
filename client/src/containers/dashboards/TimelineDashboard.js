import React from 'react';
//import TimelinePlot from "../components/TimelinePlotApexChart.js";
import TimelinePlot from '../components/TimelinePlotChartJs';
import TimelineDashboardHeader from '../headers/TimelineDashboardHeader';
import {
  MapKeyToUnit,
  FirstLetterToUpper,
} from '../../utils/PlotDescriptionHelper';
import '../Dashboard.css';
import * as moment from 'moment';
import { fetchWeatherData } from '../../utils/FetchServerData';

const intervalInMin = 5;

class TimelineDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeSeries: {
        temperature: [],
        humidity: [],
        pressure: [],
      },
    };
  }

  loadData = async () => {
    try {
      // db has unix timestamp in seconds in UTC zone
      const today = moment().startOf('day').unix();
      const result = await fetchWeatherData(today);
      this.setState({
        timeSeries: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.loadData();
    this.fetchInterval = setInterval(this.loadData, intervalInMin * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  render() {
    var plots = Object.keys(this.state.timeSeries).map((key, index) => {
      return (
        <TimelinePlot
          key={key + index}
          series={this.state.timeSeries[key]}
          yAxisName={FirstLetterToUpper(key)}
          yAxisUnit={MapKeyToUnit(key)}
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
