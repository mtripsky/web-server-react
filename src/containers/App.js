import React from 'react';
import db from '../dbConfig';
import './App.css';
import TimelineDashboard from './TimelineDashboard';
const moment = require('moment');

class App extends React.Component {
  _isMounted = false;

  constructor() {
    super();

    this.state = {
      weatherData: [],
      lastTemperature: null
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    //let collectionRef = db.collection('weather');
    //let temperatureRef = db.collection('weather').collection('temperature');

    // temperatureRef.limitToLast(1).get().then(querySnap => {
    //   console.log(`${JSON.stringify(querySnap.data())}`);
    // })
  //   db.collection('temperature').get().then(querySnap => {
  //     querySnap.forEach((subDoc) => {
      
  //       console.log(`${JSON.stringify(querySnap.data())}`);
  //     })
  // });
    var dbRoot = db.ref('weather');
    var temperature = dbRoot.child('temperature');
    temperature.on("child_added", snap => {
      let temp = snap.child('measurement').child('value').val();
      // console.log(snap);
      // console.log(snap.child('measurement').val());
      // console.log(temp);
      if (this._isMounted) {
        this.setState({
          lastTemperature: temp,
        });
      }
    });
    // temperature.orderByChild('timeStamp').limitToLast(100).on("value", snap => {
    //   let tempArray = Array(2).fill([]);
    //   // for(var i = 0; i < tempArray.length; ++i)
    //   // {
    //   //   tempArray[i] = []
    //   // }
    //   snap.forEach((child) => {
    //     const value = child.child('measurement').child('value').val();
    //     const time = child.child('timeStamp').val();
    //    // tempArray.push({x: time, y: value});
    //     if(isNaN(value) || isNaN(time))
    //     {
    //       console.log(`value: ${value}, time: ${time}`);
    //     }
    //     else if(child.child('sensor').val() === "DHT11")
    //     {
    //       tempArray[0].push({x: moment.unix(time).format("YYYY-MM-DD HH:mm"), y: value});
    //     } else {
    //       tempArray[1].push({x: moment.unix(time).format("YYYY-MM-DD HH:mm"), y: value});
    //     }
    //     //console.log(time)
    //    // console.log(value);
    //   })
    //   //console.log(tempArray.length);
    //   //console.log(tempArray[0])
    //   //let data = [].push();
    //   if (this._isMounted) {
    //     this.setState({
    //       weatherData: [
    //         { 
    //           id: "DHT11", 
    //           data: tempArray[0]
    //         },
    //         {
    //           id: "BME280", 
    //           data: tempArray[1]
    //         }]
    //    });
    //   }
    // });
  }

  render() {
    return (
      <div>
      <div className="App">
        {/* <header className="App-header">
        </header> */}
        <p>Current outside temperature: {this.state.lastTemperature}°C</p>
      </div>
      {/* <div>
        <TimelineDashboard 
          weatherData={this.state.weatherData}  
        />
      </div> */}
      </div>
  )};
}

export default App;
