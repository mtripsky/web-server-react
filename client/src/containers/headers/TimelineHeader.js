import React from 'react';
import '../Dashboard.css';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const TimelineDashboardHeader = (props) => {
  const intervalButtons = () => {
    const buttonStyle = 'outline-dark';
    return (
      <ToggleButtonGroup
        type='radio'
        name='options'
        defaultValue={'1 days'}
        onChange={props.handleChange}
        size='sm'
      >
        <ToggleButton value={'1 days'} variant={buttonStyle}>
          1 day
        </ToggleButton>
        <ToggleButton value={'3 days'} variant={buttonStyle}>
          3 days
        </ToggleButton>
        <ToggleButton value={'1 weeks'} variant={buttonStyle}>
          1 week
        </ToggleButton>
        <ToggleButton value={'2 weeks'} variant={buttonStyle}>
          2 weeks
        </ToggleButton>
        <ToggleButton value={'1 months'} variant={buttonStyle}>
          1 month
        </ToggleButton>
      </ToggleButtonGroup>
    );
  };

  return <small>{intervalButtons()}</small>;
};

export default TimelineDashboardHeader;
