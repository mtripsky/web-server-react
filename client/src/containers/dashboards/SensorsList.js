import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import SensorMeasurement from '../components/SensorMeasurement';

const SensorsList = (props) => {
  const sensorsMeasurement = props.sensors.map((sensor) => {
    return (
      <SensorMeasurement
        key={sensor.name + sensor.unit}
        value={sensor.value}
        unit={sensor.unit}
        sensorName={sensor.name}
        showDayExtremes={props.showDayExtremes}
        getDayExtremes={props.getDayExtremes}
        quantity={props.title}
      />
    );
  });

  return (
    <>
      <Card.Title className='text-center'>
        {props.title.toUpperCase()}
      </Card.Title>
      <Card.Body>
        Sensors:
        <CardGroup> {sensorsMeasurement}</CardGroup>
      </Card.Body>
    </>
  );
};

export default SensorsList;
