import React, { Component } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

    const MeasurementTime = [0];
    const MeasurementArray = [0];

class LoadCellChart extends React.Component {
  constructor() {
    super();
    this.state = {
      options: MeasurementTime,
      data: MeasurementArray,
    };
  }

  render() {
    return <Line options={this.state.options} data={this.state.data} />
  }
}

export default LoadCellChart;