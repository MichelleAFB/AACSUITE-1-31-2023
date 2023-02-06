import React from 'react'
import {useState,useEffect} from 'react'
import { Bar } from "react-chartjs-2";


function VoteGraph() {


  const [chartData, setChartData] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["January", "February", "March", "April"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [65, 59, 80, 81]
        },
        {
          label: "Dataset 2",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
          hoverBorderColor: "rgba(54, 162, 235, 1)",
          data: [28, 48, 40, 19]
        }
      ]
    });
  }, []);

  const updateData = newData => {
    let data = chartData;
    data.datasets[0].data = newData;
    setChartData(data);
  };


  return (
    <div>
       <Bar data={chartData} />
      <button onClick={() => updateData([30, 40, 50, 60])}>
        Update Data
      </button>
    </div>
  )
}

export default VoteGraph