import axios from 'axios'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { BASE_URL } from '../../api/requet'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê doanh thu theo từng tháng '
      }
    }
  }
  
export function VerticalBarChart() {
    const data = {
        
        datasets: [
          {
            label: 'Doanh thu theo từng tháng',
           
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          },
        ]
      }
    return <Bar options={options} data={data}  />
  }