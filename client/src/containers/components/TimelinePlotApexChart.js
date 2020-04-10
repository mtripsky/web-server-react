import React from 'react';
import ApexCharts from 'react-apexcharts';

class TimelinePlot extends React.Component {
  constructor(props) {
    super(props);
    console.log('TIMElinePlot');
    console.log(this.props.series);
    this.state = {
      series: this.props.series,
      options: {
        chart: {
          //height: "100%",
          type: 'line',
          zoom: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Product Trends by Month',
          align: 'center',
        },
        grid: {
          row: {
            //  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            //opacity: 0.5
          },
        },
        // xaxis: {
        //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        // }
        xaxis: {
          labels: {
            datetimeFormatter: {
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm',
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div className='measurement-row'>
        <ApexCharts
          options={this.state.options}
          series={this.state.series}
          type='line'
          height='100%'
        />
      </div>
    );
  }
}

export default TimelinePlot;
