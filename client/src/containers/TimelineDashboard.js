import React from 'react';
import TimelinePlot from './TimelinePlotApexChart.js';
import TimelineDashboardHeader from './TimelineDashboardHeader';
import './Dashboard.css';

class TimelineDashboard extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   timeMeasurements: {
    //     "temperature":[
    //       {
    //         name:"DHT11",
    //         data: [{x:'2020-04-01 07:00:00', y:10}, {x:'2020-04-01 08:00:00', y:20}]
    //       },
    //       {
    //         name:"BME280",
    //         data: [{x:'2020-04-01 07:00:00', y:11}, {x:'2020-04-01 08:00:00', y:21}]
    //       } 
    //     ],
    //     "humidity":[
    //       {
    //         name:"DHT11",
    //         data: [{x:'2020-04-01 07:00:00', y:10}, {x:'2020-04-01 08:00:00', y:20}]
    //       },
    //       {
    //         name:"BME280",
    //         data: [{x:'2020-04-01 07:00:00', y:11}, {x:'2020-04-01 08:00:00', y:21}]
    //       }
    //     ],
    //     "pressure":[
    //       {
    //         name:"BME280",
    //         data: [{x:'2020-04-01 07:00:00', y:11}, {x:'2020-04-01 08:00:00', y:21}]
    //       }
    //     ]
    //   }
    // }
  }

  render() {
    var plots = Object.keys(this.props.timeSeries).map((key, index) => {   
      console.log(this.props.timeSeries[key]);
      console.log(key);
      return (
        <TimelinePlot 
          key={key+index}
          series={this.props.timeSeries[key]}
        />
      );
    });
      
    return (
      <div className="width-90">
        <TimelineDashboardHeader />
        <div className="dashboard__column">
          {plots}
        </div>
      </div>
  )};
}

export default TimelineDashboard;