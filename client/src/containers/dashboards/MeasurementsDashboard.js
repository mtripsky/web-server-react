import React, { useEffect } from 'react';
import SensorMeasurementList from './SensorMeasurementList';
import MeasurementsDashboardHeader from '../headers/MeasurementsDashboardHeader';
import '../Dashboard.css';
import { Card } from 'react-bootstrap';
import { firebaseDb } from '../../db/firebase';
import * as moment from 'moment';

const MeasurementsDashboard = (props) => {
  const [measurements, setMeasurements] = React.useState({});
  const [updatedTime, setUpdatedTime] = React.useState(null);

  function setMeasurementsUpdatesForFirebaseSnapshot(
    child,
    measurementUpdates
  ) {
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
  }, []);

  return (
    <div className='width-90'>
      <MeasurementsDashboardHeader timeUpdated={updatedTime} />
      <Card>
        {Object.keys(measurements).map((key, index) => {
          return (
            <SensorMeasurementList
              key={key + index}
              title={key}
              sensors={measurements[key]}
            />
          );
        })}
      </Card>
    </div>
  );
};

export default MeasurementsDashboard;

{
  /* <div className='dashboard__column'>
        {Object.keys(measurements).map((key, index) => {
          return (
            <SensorMeasurementList
              key={key + index}
              title={key}
              sensors={measurements[key]}
            />
          );
        })}
      </div> */
}
