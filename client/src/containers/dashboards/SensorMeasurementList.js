import React from 'react';
import SensorMeasurement from '../components/SensorMeasurement';
import '../Dashboard.css';

class SensorMeasurementList extends React.Component {
  render() {
    const sensorsMeasurement = this.props.sensors.map((sensor) => {
      return (
        <SensorMeasurement
          key={sensor.name + sensor.unit}
          value={sensor.value}
          unit={sensor.unit}
          sensorName={sensor.name}
        />
      );
    });

    return (
      <div className='measurement-row'>
        <h3>{this.props.title.toUpperCase()}</h3>
        <div>{sensorsMeasurement}</div>
      </div>
    );
  }
}

export default SensorMeasurementList;
