import React from 'react'
import {useState,useEffect} from 'react'

//outside
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';





function VoteGraph() {


  const [startersChartData, setStartersChartData] = useState({});
  const[starters,setStarters]=useState()
  const[sandwhiches,setSandwhiches]=useState()
  const[sweets,setSweets]=useState()
  const[isLoading,setIsLoading]=useState(true)
  const[show,setShow] =useState(false)
  useEffect(() => {

    const prom=new Promise((resolve,reject) => {
      axios.get("https://accserverheroku.herokuapp.com/company/getVotes").then((response) => {
        console.log(response.data)
        setStarters(response.data.starters)
        setSandwhiches(response.data.sandwhiches)
        setSweets(response.data.sweets)
      })
      resolve()
    })

    prom.then(() => {   
      setIsLoading(false)
      console.log(starters)
    })
 
  }, []);


  


if(!isLoading){

  
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

 const options = {
  maintainAspectRatio: false,
 width:600,
 height:600,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = [starters[0].name,starters[1].name,starters[2].name, starters[3].name];

const data = {
  labels,
  datasets: 
[{
      label: 'Dataset 1',
      data: starters.map((m) => m.votes),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }],
  
};

  console.log(starters)
  return (
    <div>
      {
        show ?
         <div >
            <Bar options={options} data={data}  height="400px" width="300px"/>
        </div>
         :<p></p>}
      <button class="p-3 bg-purple-300 rounded-md"onClick={() => {

          setShow(!show)
      }}>
        Update Data
      </button>
    </div>
  )
}
}
export default VoteGraph

/**
 * 
          setStartersChartData({
            labels: [starters[0].name, starters[1].name , starters[2].name, starters[3].name],
            datasets: [
              {
                label: "Dataset 1",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [starters[0].votes, starters[1].votes, starters[2].votes, starters[3].votes]
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
 */