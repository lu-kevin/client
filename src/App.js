import React from 'react';

import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

import SensorChart from './SensorChart';
import LoadCellChart from './LoadCellChart';

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

const socket = io.connect("http://localhost:3001");

function App() {

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("sendMsg", {message});
    //MeasurementTime.length = 0;
    //MeasurementArray.length = 0;
  };

  useEffect(() => {
    socket.on("getMsg", (data) => {
      setMessageReceived(data.message);
      MeasurementTime.push(MeasurementTime[MeasurementTime.length - 1] + 1);
      console.log(`Time: ${MeasurementTime}`);
      MeasurementArray.push(data.message);
      console.log(`Data: ${MeasurementArray}`);
      //Line.update();
    });
  }, [socket]);

  //

  const MeasurementTime = [0];
  const MeasurementArray = [0];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Load Cell Sensor Data',
      },
      
    },
  };

  const data = {
    labels: MeasurementTime,
    datasets: [
      {
        label: 'Force (g)',
        data: MeasurementArray,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="App">
      <input
        placeholder="Placeholder..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Toggle Record</button>
      <h1>Current value:</h1>
      {messageReceived}
      <SensorChart
        options={options}
        data={data}
        redraw={true}
      />
      </div>
  );
}

export default App;
