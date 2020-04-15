import React from 'react';
import { Card } from 'react-bootstrap';
import '../Dashboard.css';

const MeasurementsDashboardHeader = (props) => {
  return (
    <Card className='text-center'>
      <Card.Footer>
        <small className='text-muted'>Last updated {props.timeUpdated}</small>
      </Card.Footer>
    </Card>
  );
};

export default MeasurementsDashboardHeader;
