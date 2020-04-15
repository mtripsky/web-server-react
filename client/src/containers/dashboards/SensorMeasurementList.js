import React from 'react';
import { CardDeck, Card, CardGroup } from 'react-bootstrap';
import SensorMeasurement from '../components/SensorMeasurement';
import '../Dashboard.css';

const SensorMeasurementList = (props) => {
  const sensorsMeasurement = props.sensors.map((sensor) => {
    return (
      <SensorMeasurement
        key={sensor.name + sensor.unit}
        value={sensor.value}
        unit={sensor.unit}
        sensorName={sensor.name}
      />
    );
  });

  const cardStyle = 'Light';

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

export default SensorMeasurementList;

// <Card
//       className='text-center'
//       bg={cardStyle.toLowerCase()}
//       text={cardStyle.toLowerCase() === 'light' ? 'dark' : 'white'}
//     >
//     </Card>
