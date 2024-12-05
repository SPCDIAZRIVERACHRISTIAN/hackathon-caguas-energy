import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DisBarchart = () => {
  const [distributionData, setDistributionData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [periods, setPeriods] = useState([]); // To hold the list of periods from the JSON
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0); // Track the current period index

  useEffect(() => {
    // Fetch data for distribution
    fetch('http://127.0.0.1:5000/indices/todos')
      .then((response) => response.json())
      .then((data) => {
        const periodKeys = Object.keys(data["by_period"]);
        setPeriods(periodKeys); // Store all periods in state
        if (periodKeys.length > 0) {
          const initialPeriod = periodKeys[0];
          updateChartData(data, initialPeriod);
        }
      })
      .catch((error) => console.error('Error fetching distribution data:', error));
  }, []);

  const updateChartData = (data, period) => {
    const periodData = data["by_period"][period]["distribucion"];
    const districtNames = Object.keys(periodData);
    const saidiValues = districtNames.map((district) =>
      parseFloat(periodData[district]["saidi"]) // Parse SAIDI values
    );

    // Update state with new data
    setLabels(districtNames);
    setDistributionData(saidiValues);
  };

  const handlePeriodChange = (direction) => {
    setCurrentPeriodIndex((prevIndex) => {
      let newIndex = prevIndex + direction;
      if (newIndex < 0) newIndex = periods.length - 1; // Wrap around to the last period
      if (newIndex >= periods.length) newIndex = 0; // Wrap around to the first period
      updateChartDataFromIndex(newIndex);
      return newIndex;
    });
  };

  const updateChartDataFromIndex = (index) => {
    fetch('http://127.0.0.1:5000/indices/todos')
      .then((response) => response.json())
      .then((data) => {
        const period = periods[index];
        updateChartData(data, period);
      })
      .catch((error) => console.error('Error fetching distribution data:', error));
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Distribution Data (SAIDI Periodo ${periods[currentPeriodIndex] || ''})`,
        data: distributionData,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 14,
          },
        },
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribution Data (SAIDI) by District',
        color: 'rgba(255, 255, 255, 0.85)',
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
      <div className="flex justify-between mb-4">
        <button
          onClick={() => handlePeriodChange(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Previous
        </button>
        <button
          onClick={() => handlePeriodChange(1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Next
        </button>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DisBarchart;
