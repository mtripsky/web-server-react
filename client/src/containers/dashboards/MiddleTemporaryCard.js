import React, { useEffect } from 'react';
import SensorMeasurementList from './SensorMeasurementList';
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
import TimelineDashboardHeader from '../headers/TimelineDashboardHeader';

const intervalInMin = 5;

const MiddleTemporaryCard = (props) => {
  const [measurements, setMeasurements] = React.useState({});
  const [updatedTime, setUpdatedTime] = React.useState(null);
  const [startTimeUnix, setStartTimeUnix] = React.useState(
    moment().startOf('day').unix()
  );
  const [endTimeUnix, setEndTimeUnix] = React.useState(
    moment().add(1, 'days').startOf('day').unix()
  );

  function setMeasurementsUpdatesForFirebaseSnapshot(
    child,
    measurementUpdates
  ) {
    console.log(child.key);
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
  }

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
        setMeasurementsUpdatesForFirebaseSnapshot(child, measurementUpdates);
      });

      setMeasurements(measurementUpdates);
    });

    ref.on('child_changed', (child) => {
      setMeasurementsUpdatesForFirebaseSnapshot(child, measurementUpdates);

      setMeasurements(measurementUpdates);
    });

    props.loadData(startTimeUnix);
    var fetchInterval = setInterval(function () {
      props.loadData(startTimeUnix);
    }, intervalInMin * 60 * 1000);

    console.log('useEffect');
    return function cleanup() {
      console.log('cleanup');
      clearInterval(fetchInterval);
      ref.off();
    };
  }, [startTimeUnix]);

  return (
    <div className='width-90'>
      <Card className='flex-row' bg='Dark'>
        <Card.Header style={{ width: '25%' }}>
          <small className='text-muted'>Last updated {updatedTime}</small>
        </Card.Header>
        <Card.Body>
          <TimelineDashboardHeader handleChange={handleStartTimeChange} />
        </Card.Body>
      </Card>

      {Object.keys(measurements).map((key, index) => {
        return (
          <Card className='flex-row' bg='Light'>
            <Card.Header className='bg-white' style={{ width: '25%' }}>
              <SensorMeasurementList
                key={key + index}
                title={key}
                sensors={measurements[key]}
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

export default MiddleTemporaryCard;
