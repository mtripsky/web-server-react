import React from 'react';
import './Dashboard.css';
 
class SensorMeasurement extends React.Component {
  render() {
    return(
      <div className="measurement__value">
        <div>
          {this.props.value}
          {this.props.unit}
        </div>
        {this.props.sensorName.toUpperCase()}
      </div>
    )
  }
}

export default SensorMeasurement;
