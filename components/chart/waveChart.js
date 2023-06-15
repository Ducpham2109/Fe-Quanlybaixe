import axios from 'axios'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip, 
  scales
} from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { BASE_URL } from '../../api/requet'
import moment from 'moment'

ChartJS.register(CategoryScale,LineController,PointElement,LineElement, LinearScale, BarElement, Title, Tooltip, Legend)
export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê doanh thu theo từng ngày '
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            var label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString('en-US') + ' VND';
            }
            return label;
          },
        },
     
    },
    },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Ngày',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'VND',
          },
        },
      },
       
    
  }
  
export function WaveChart() {
  const [month, setMonth] = useState()
  const [revenue, setRevenue]= useState([])
  const [labels, setLabels] = useState([])
  const [parkingCode,setParkingCode] = useState()
const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    const initialValues =(sessionStorage.getItem('parkingCode'))
    setParkingCode(initialValues);
  }, []);
  useEffect(() => {
    const monthNumber = parseInt(moment().format("M"));
    setCurrentMonth(monthNumber);
  },[currentMonth]);
  console.log("cu",currentMonth)
  useEffect(() => {
    if (currentMonth !== "") {
    const getData = async () => {
      const revenueData = [];
      for (let i = 1; i <= 30; i++) {
      const response = await axios.get(
        `${BASE_URL}bill/revenue/parkingCode/month/day?Day=${i}&Month=${currentMonth}&ParkingCode=${parkingCode}`
      )
      revenueData.push(response.data.revenve)
    }
    setRevenue(revenueData);
  }
  getData()
}
  }, [currentMonth])
console.log("re",revenue)
useEffect(()=>{
  const label = revenue.map((item,index)=>{
    const monthH=`${index}-${index+3}`
    return monthH
  })
setLabels([... label])

},[revenue])
    const data = {
      labels,
        datasets: [
          {
            label: 'Doanh thu',
            data: labels.map((item, index) => revenue[index]),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
        ]
      }
    return <Line  options={options} data={data}  />
  }