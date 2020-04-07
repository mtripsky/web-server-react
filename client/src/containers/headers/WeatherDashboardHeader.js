import React from 'react';
import '../Dashboard.css';

class WeatherDashboardHeader extends React.Component {
  render() {
    return (
      <div className="dashboard-header">
        <h4>Updated ({this.props.timeUpdated})</h4>
      </div>
    )
  };
}

export default WeatherDashboardHeader;