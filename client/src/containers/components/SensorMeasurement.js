import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { roundToOne } from '../../utils/Calculator';
import * as moment from 'moment';

const SensorCard = (props) => {
  const [dayMin, setDayMin] = React.useState();
  const [dayMax, setDayMax] = React.useState();

  useEffect(() => {
    if (props.showDayExtremes) {
      const fetchExtremes = async () => {
        const startOfDay = moment().startOf('day').unix();
        const extremes = await props.getDayExtremes(
          startOfDay,
          props.sensorName.toUpperCase(),
          props.quantity.toLowerCase()
        );
        setDayMin(extremes.min);
        setDayMax(extremes.max);
      };
      fetchExtremes();
    }
  }, []);

  const renderExtremes = (newValue) => {
    if (props.showDayExtremes) {
      if (newValue > dayMax) {
        setDayMax(newValue);
      }
      if (newValue < dayMin) {
        setDayMin(newValue);
      }

      return (
        <Card.Text>
          <small className='text-muted'>
            Max: {dayMax}
            {props.unit}
            <p>
              Min: {dayMin}
              {props.unit}
            </p>
          </small>
        </Card.Text>
      );
    }
  };

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
          {renderExtremes(props.value)}
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default SensorCard;
