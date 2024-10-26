import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReliabilityMetrics = () => {
  const data = {
    labels: [
      'San Juan', 'Bayamón', 'Carolina', 'Ponce', 'Mayagüez', 'Arecibo',
      'Caguas', 'Guaynabo', 'Humacao', 'Aguadilla', 'Fajardo',
      'Guayama', 'Yauco', 'Manatí', 'Vega Baja'
    ],
    datasets: [
      {
        label: 'SAIDI (minutes)',
        data: [120.5, 145.2, 98.7, 167.3, 189.1, 156.4, 134.8, 112.9, 178.5, 143.2, 165.7, 198.3, 187.6, 145.9, 156.8],
        backgroundColor: '#8884d8',
      },
      {
        label: 'SAIFI (interruptions)',
        data: [3.2, 4.1, 2.8, 4.8, 5.2, 4.3, 3.7, 3.0, 4.9, 3.9, 4.5, 5.4, 5.1, 4.0, 4.2],
        backgroundColor: '#82ca9d',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        ticks: { maxRotation: 45, minRotation: 45 },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-lg">
      <div className="mb-4 text-lg font-semibold text-gray-800">
        SAIDI and SAIFI Metrics by District
      </div>
      <div className="h-96 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ReliabilityMetrics;
