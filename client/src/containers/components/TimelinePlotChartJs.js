import React from 'react';
import { Line } from 'react-chartjs-2';
import { GetColors } from '../../utils/PlotDescriptionHelper';

class TimelinePlot extends React.Component {
  MapPropsToData(props) {
    const colors = GetColors(props.series.length);
    return props.series.map((dataset, index) => {
      return {
        label: dataset.name,
        data: dataset.data,
        borderWidth: 2,
        fill: false,
        borderColor: colors[index],
      };
    });
  }

  MapPropsToOptions(props) {
    return {
      elements: {
        point: {
          radius: 0,
        },
      },
      legend: {
        position: 'top',
        align: 'end',
      },
      scales: {
        yAxes: [
          {
            ticks: props.yAxisTicks,
            scaleLabel: {
              display: true,
              labelString: props.yAxisName + props.yAxisUnit,
            },
          },
        ],
        xAxes: [
          {
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD HH:mm',
              tooltipFormat: 'll HH:mm',
            },
            ticks: {
              min: props.xAxisStart,
              max: props.xAxisEnd,
              display: true,
              fontSize: 10,
            },
          },
        ],
      },
    };
  }

  render() {
    const dataset = { datasets: this.MapPropsToData(this.props) };
    return (
      <div className='measurement-row'>
        <Line
          data={dataset}
          options={this.MapPropsToOptions(this.props)}
          position='relative'
          height='18%'
          width='95%'
        />
      </div>
    );
  }
}

export default TimelinePlot;
