import React from 'react';
import '../Dashboard.css';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class TimelineDashboardHeader extends React.Component {
  render() {
    var buttons = [
      '1 day',
      '3 days',
      '1 week',
      '2 weeks',
      '1 month',
      '3 months',
    ].map((text) => <button key={text}>{text}</button>);

    return (
      <div className='dashboard-header'>
        <h4></h4>
        <ToggleButtonGroup type='radio' name='options' defaultValue={1}>
          <ToggleButton value={1}>Radio 1 (pre-checked)</ToggleButton>
          <ToggleButton value={2}>Radio 2</ToggleButton>
          <ToggleButton value={3}>Radio 3</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }
}

export default TimelineDashboardHeader;
