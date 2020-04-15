import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import TimelinePlot from '../components/TimelinePlotChartJs';
import TimelineDashboardHeader from '../headers/TimelineDashboardHeader';
import {
  MapKeyToUnit,
  MapKeyToLabelString,
  MapYAxisTicks,
} from '../../utils/PlotDescriptionHelper';
import '../Dashboard.css';
import * as moment from 'moment';

const intervalInMin = 5;

const TimelineDashboard = (props) => {
  const [startTimeUnix, setStartTimeUnix] = React.useState(
    moment().startOf('day').unix()
  );
  const [endTimeUnix, setEndTimeUnix] = React.useState(
    moment().add(1, 'days').startOf('day').unix()
  );

  const handleStartTimeChange = (selectedStartInterval) => {
    let numberString = selectedStartInterval.split(' ');
    let startTime = moment()
      .subtract(numberString[0], numberString[1]) // subtract from current date
      .add(1, 'days') // one day must be added if we use startOf('day')
      .startOf('day')
      .unix();
    setStartTimeUnix(startTime);
  };

  useEffect(() => {
    props.loadData(startTimeUnix);
    var fetchInterval = setInterval(function () {
      props.loadData(startTimeUnix);
    }, intervalInMin * 60 * 1000);

    return function cleanup() {
      clearInterval(fetchInterval);
    };
  }, [startTimeUnix]);

  return (
    <div className='width-90'>
      <TimelineDashboardHeader handleChange={handleStartTimeChange} />
      <Card>
        {Object.keys(props.timeSeries).map((key, index) => {
          return (
            <TimelinePlot
              key={key + index}
              series={props.timeSeries[key]}
              yAxisName={MapKeyToLabelString(key)}
              yAxisUnit={MapKeyToUnit(key)}
              xAxisStart={startTimeUnix}
              xAxisEnd={endTimeUnix}
              yAxisTicks={MapYAxisTicks(key)}
            />
          );
        })}
      </Card>
    </div>
  );
};

export default TimelineDashboard;
