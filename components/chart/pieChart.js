import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)
export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Biểu đồ thống kê doanh thu của tháng mới nhất của các bãi đỗ'
    }
  }
}
export const data = {
  labels: [
    '88 Láng Hạ',
    'Chợ Láng Hạ',
    '1112 Giải Phóng',
    'Chung cư 243',
    'T4 Time City',
    'Kho Lĩnh Nam'
  ],
  datasets: [
    {
      label: '# of Votes',
      data: [405, 470, 328, 276, 127, 92],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
}

export function PieChart() {
  return <Pie options={options} data={data} />
}
