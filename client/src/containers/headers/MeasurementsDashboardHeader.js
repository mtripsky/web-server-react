import React from 'react';
import { Card } from 'react-bootstrap';
import TimelineHeader from './TimelineHeader';

const MeasurementsDashboardHeader = (props) => {
  return (
    <Card className='flex-row' bg='Light'>
      <Card.Header className='bg-white' style={{ width: '25%' }}>
        <small className='text-muted'>Last updated {props.updatedTime}</small>
      </Card.Header>
      <Card.Body>
        <TimelineHeader handleChange={props.handleChange} />
      </Card.Body>
    </Card>
  );
};

export default MeasurementsDashboardHeader;
