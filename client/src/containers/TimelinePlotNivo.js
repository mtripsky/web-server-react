import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import './Dashboard.css';

class TimelinePlot extends React.Component {
  render() {
    //console.log(this.props.isXaxisVissible);
    const axisBottom = this.props.isXaxisVissible 
    ? {
      orient: 'bottom',
      // tickSize: 5,
      // tickPadding: 5,
      // tickRotation: 0,
      legend: this.props.xAxisLegend,
      // legendOffset: 36,
      legendPosition: 'middle',
      format: '%H:%M:%S'
    }
    : null;

    //console.log(this.props.data[0]);
    return(
      <div className="dashboard__column">
      <ResponsiveLine
        data={this.props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'time', format: "%Y-%m-%d %H:%M:%S"}}
        yScale={{ type: 'linear',  min: 'auto', max: 'auto', stacked: true, reverse: false }}
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={axisBottom}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: this.props.yAxisLegend,
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        lineWidth={1}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        /*{ legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 10,
                itemDirection: 'left-to-right',
                itemWidth: 70,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 17,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]} }*/
    />
    </div>
  )};
}

export default TimelinePlot;