import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import '../Dashboard.css';
import { roundToOne } from '../../utils/Calculator';

const SensorMeasurement = (props) => {
  const cardStyle = 'Light';
  return (
    <>
      <Card
        className='text-center'
        bg={cardStyle.toLowerCase()}
        text={cardStyle.toLowerCase() === 'light' ? 'dark' : 'white'}
      >
        <Card.Header>{props.sensorName.toUpperCase()}</Card.Header>
        <Card.Body>
          <Card.Title>
            {roundToOne(props.value)}
            {props.unit}
          </Card.Title>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default SensorMeasurement;
