import { ArcElement, Chart as ChartJS, Colors, Filler } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Colors, Filler)

function generateData() {
  return Array(10)
    .fill()
    .map((v, i) => ++i)
}

const chartData = {
  datasets: [
    {
      data: generateData()
    }
  ]
}

const options = {
  type: 'pie',
  options: {
    plugins: {
      legend: false,
      tooltip: false
    }
  }
}

export default function SubscriptionChart() {
  return (
    <div className="w-[300px]">
      <h2 className="mb-4 text-xl">Subscriptions</h2>
      <Doughnut options={options} data={chartData} />
    </div>
  )
}
