import React from 'react';
import { Line } from 'react-chartjs-2';
import { GetColors } from '../../utils/PlotDescriptionHelper';

class TimelinePlot extends React.Component {
  MapPropsToData(props) {
    //console.log(props.series);
    const colors = GetColors(props.series.length);
    //console.log(colors);
    return props.series.map((dataset, index) => {
      //console.log(dataset.data);
      //console.log(index);
      return {
        label: dataset.name,
        data: dataset.data,
        borderWidth: 1,
        fill: false,
        borderColor: colors[index],
        pointBackgroundColor: 'rgb(255,255,255)',
      };
    });
  }

  MapPropsToOptions(props) {
    //console.log(props);
    return {
      scales: {
        yAxes: [
          {
            // ticks: {
            //   suggestedMin: 0,
            //   suggestedMax: 40
            // },
            scaleLabel: {
              display: true,
              labelString: props.yAxisName + props.yAxisUnit,
            },
          },
        ],
        xAxes: [
          {
            type: 'time',
            // ticks: {
            //   source: 'data'
            // },
            // time: {
            //   //parser: 'YYYY-MM-DD HH:mm',
            //   //parser: 'YYYY-MM-DD HH:mm',
            //   unit: 'minute',
            //   unitStepSize: 30,
            // }
            time: {
              parser: 'YYYY-MM-DD HH:mm',
              //round: 'day',
              tooltipFormat: 'll HH:mm',
              unit: 'minute',
              unitStepSize: 30,
            },
            scaleLabel: {
              display: true,
              labelString: 'Date',
            },
            ticks: {
              major: {
                enabled: true,
              },
              fontStyle: function (context) {
                return context.tick && context.tick.major ? 'bold' : undefined;
              },
              fontColor: function (context) {
                return context.tick && context.tick.major
                  ? '#FF0000'
                  : undefined;
              },
            },
          },
        ],
      },
    };
  }

  render() {
    //const datasets = ;
    const dataset = { datasets: this.MapPropsToData(this.props) };
    //console.log(this.MapPropsToOptions(this.props));
    return (
      <div className='measurement-row'>
        <Line
          data={dataset}
          options={this.MapPropsToOptions(this.props)}
          height='15%'
          width='95%'
        />
      </div>
    );
  }
}

export default TimelinePlot;
