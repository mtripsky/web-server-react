import React, { useEffect } from 'react';
import SensorsList from './SensorsList';
import MeasurementsDashboardHeader from '../headers/MeasurementsDashboardHeader';
import '../Dashboard.css';
import { Card } from 'react-bootstrap';
import { firebaseDb } from '../../db/firebase';
import * as moment from 'moment';
import {
  MapKeyToUnit,
  MapKeyToLabelString,
  MapYAxisTicks,
} from '../../utils/PlotDescriptionHelper';
import TimelinePlot from '../components/TimelinePlotChartJs';

const intervalInMin = 5;

const MeasurementsDashboard = (props) => {
  const [measurements, setMeasurements] = React.useState({});
  const [updatedTime, setUpdatedTime] = React.useState(null);
  const [startTimeUnix, setStartTimeUnix] = React.useState(
    moment().startOf('day').unix()
  );
  const [endTimeUnix, setEndTimeUnix] = React.useState(
    moment().add(1, 'days').startOf('day').unix()
  );

  const getMeasurementUpdates = (child, measurementUpdates) => {
    if (props.measurements.includes(child.key)) {
      let sensors = [];
      child.forEach((c) => {
        sensors.push({
          name: c.key,
          value: c.child('value').val(),
          unit: c.child('unit').val(),
        });
        setUpdatedTime(
          moment.unix(c.child('timeStamp').val()).format('YYYY-MM-DD HH:mm')
        );
      });
      measurementUpdates[child.key] = sensors;
    }
  };

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
    const ref = firebaseDb.ref(props.realDb);
    let measurementUpdates = Object.assign(
      {},
      ...props.measurements.map((key) => ({ [key]: [] }))
    );

    ref.once('value', (snapshot) => {
      snapshot.forEach((child) => {
        getMeasurementUpdates(child, measurementUpdates);
      });

      setMeasurements(measurementUpdates);
    });

    ref.on('child_changed', (child) => {
      getMeasurementUpdates(child, measurementUpdates);

      setMeasurements(measurementUpdates);
    });

    props.loadData(startTimeUnix);
    var fetchInterval = setInterval(function () {
      props.loadData(startTimeUnix);
    }, intervalInMin * 60 * 1000);

    return function cleanup() {
      clearInterval(fetchInterval);
      ref.off();
    };
  }, [startTimeUnix]);

  return (
    <div className='width-90'>
      <MeasurementsDashboardHeader
        updatedTime={updatedTime}
        handleChange={handleStartTimeChange}
      />

      {Object.keys(measurements).map((key, index) => {
        return (
          <Card className='flex-row' bg='Light'>
            <Card.Header className='bg-white' style={{ width: '25%' }}>
              <SensorsList
                key={key + index}
                title={key}
                sensors={measurements[key]}
                showDayExtremes={props.showDayExtremes}
                getDayExtremes={props.getDayExtremes}
              />
            </Card.Header>
            <Card.Body>
              <TimelinePlot
                key={key + index}
                series={props.timeSeries[key]}
                yAxisName={MapKeyToLabelString(key)}
                yAxisUnit={MapKeyToUnit(key)}
                xAxisStart={startTimeUnix}
                xAxisEnd={endTimeUnix}
                yAxisTicks={MapYAxisTicks(key)}
              />
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default MeasurementsDashboard;
