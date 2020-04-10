import React from 'react';
import SensorMeasurementList from './SensorMeasurementList';
import MeasurementsDashboardHeader from '../headers/MeasurementsDashboardHeader';
import '../Dashboard.css';
import { firebaseDb } from '../../db/firebase';
import * as moment from 'moment';

class MeasurementsDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      measurements: {},
      updatedTime: null,
    };
  }

  componentDidMount() {
    var weatherRef = firebaseDb.ref(this.props.realDb);
    let measurementUpdates = Object.assign(
      {},
      ...this.props.measurements.map((key) => ({ [key]: [] }))
    );
    let lastUpdatedTime = null;

    weatherRef.once('value', (snapshot) => {
      snapshot.forEach((child) => {
        if (this.props.measurements.includes(child.key)) {
          let sensors = [];
          child.forEach((c) => {
            sensors.push({
              name: c.key,
              value: c.child('value').val(),
              unit: c.child('unit').val(),
            });
            lastUpdatedTime = moment
              .unix(c.child('timeStamp').val())
              .format('YYYY-MM-DD HH:mm');
          });
          measurementUpdates[child.key] = sensors;
        }
      });

      this.setState({
        measurements: measurementUpdates,
        updatedTime: lastUpdatedTime,
      });
    });

    weatherRef.on('child_changed', (snapshot) => {
      if (this.props.measurements.includes(snapshot.key)) {
        let sensors = [];
        snapshot.forEach((child) => {
          sensors.push({
            name: child.key,
            value: child.child('value').val(),
            unit: child.child('unit').val(),
          });
          lastUpdatedTime = moment
            .unix(child.child('timeStamp').val())
            .format('YYYY-MM-DD HH:mm');
        });
        measurementUpdates[snapshot.key] = sensors;
      }

      this.setState({
        measurements: measurementUpdates,
        updatedTime: lastUpdatedTime,
      });
    });
  }

  render() {
    const measurements = Object.keys(this.state.measurements).map(
      (key, index) => {
        return (
          <SensorMeasurementList
            key={key + index}
            title={key}
            sensors={this.state.measurements[key]}
          />
        );
      }
    );

    return (
      <div className='width-90'>
        <MeasurementsDashboardHeader timeUpdated={this.state.updatedTime} />
        <div className='dashboard__column'>{measurements}</div>
      </div>
    );
  }
}

export default MeasurementsDashboard;
