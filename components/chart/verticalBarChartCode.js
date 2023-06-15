import axios from 'axios'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip, 
  scales
} from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { BASE_URL } from '../../api/requet'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê doanh thu theo từng tháng '
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
            text: 'Tháng',
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
  
export function VerticalBarChartCode() {
  const [month, setMonth] = useState()
  const [revenue, setRevenue]= useState([])
  const [labels, setLabels] = useState([])
  const [parkingCode,setParkingCode] = useState()
  useEffect(() => {
    const initialValues =(sessionStorage.getItem('parkingCode'))
    setParkingCode(initialValues);
  }, []);
  useEffect(() => {
    
    const getData = async () => {
      const revenueData = [];
      for (let i = 1; i <= 12; i++) {
      const response = await axios.get(
        `${BASE_URL}bill/revenue/month?Month=${i}&ParkingCode=${parkingCode}`
      )
      revenueData.push(response.data.revenve)
    }
    setRevenue(revenueData);
  }

    getData()
  }, [])
useEffect(()=>{
  const label = revenue.map((item,index)=>{
    console.log("in",index)
    const monthH= index +1;
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
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          },
        ]
      }
    return <Bar options={options} data={data}  />
  }