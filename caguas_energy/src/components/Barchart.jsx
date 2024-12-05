import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Barchart = () => {
  const [distributionData, setDistributionData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // Fetch data for distribution
    fetch('http://127.0.0.1:5000/indices/todos/por_periodos')
      .then((response) => response.json())
      .then((data) => {
        // Extract the period (e.g., "Periodo de 01-01-2022 a 01-31-2022") and district data
        const period = Object.keys(data)[0];
        const districtData = data[period];

        // Set the labels to the names of the districts
        const districtNames = Object.keys(districtData);
        setLabels(districtNames);

        // Extract SAIDI values for each district
        const saifiValues = districtNames.map(district => parseFloat(districtData[district]["SAIDI"]));
        setDistributionData(saifiValues);
      })
      .catch((error) => console.error('Error fetching distribution data:', error));
  }, []);

  const data = {
    labels: labels, // Districts like 'AGUADILLA', 'ARECIBO', etc.
    datasets: [
      {
        label: 'Distribution Data (SAIDI Periodo de 01-01-2022 a 01-31-2022)',
        data: distributionData,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Adjusted to match theme
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)', // Adjusted to match theme
          font: {
            size: 14,
          },
        },
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribution Data (SAIDI) by District',
        color: 'rgba(255, 255, 255, 0.85)', // Adjusted to match theme
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div className="p-4 bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg shadow-lg h-96">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Barchart;
