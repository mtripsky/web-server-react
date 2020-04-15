import React from 'react';
import { Line } from 'react-chartjs-2';
import { GetColors } from '../../utils/PlotDescriptionHelper';
import * as moment from 'moment';

const TimelinePlot = (props) => {
  const MapPropsToData = () => {
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
  };

  const MapPropsToOptions = () => {
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
              min: moment.unix(props.xAxisStart),
              max: moment.unix(props.xAxisEnd),
              display: true,
              fontSize: 10,
            },
          },
        ],
      },
    };
  };

  const dataset = { datasets: MapPropsToData() };
  return (
    <>
      <Line
        data={dataset}
        options={MapPropsToOptions()}
        position='relative'
        height='20%'
        width='95%'
      />
    </>
  );
};

export default TimelinePlot;
