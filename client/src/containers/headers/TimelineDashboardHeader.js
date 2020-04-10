import React from 'react';
import '../Dashboard.css';

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
        {buttons}
      </div>
    );
  }
}

export default TimelineDashboardHeader;
