import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering required components for Chart.js
// These components enable bar chart rendering with titles, tooltips, legends, etc.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DisBarchart = () => {
  // State to store the distribution data values (SAIDI or SAIFI for each district)
  const [distributionData, setDistributionData] = useState([]);
  // State to store the labels (district names) for the x-axis of the chart
  const [labels, setLabels] = useState([]);
  // State to store the available periods (e.g., months or years) from the API
  const [periods, setPeriods] = useState([]);
  // State to track the currently selected period index
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
  // State to toggle between the metrics SAIDI and SAIFI
  const [metric, setMetric] = useState('saidi');

  // Fetch data from the API whenever the metric changes
  useEffect(() => {
    fetch('http://127.0.0.1:5000/indices/todos') // Fetch data from the backend API
      .then((response) => response.json())
      .then((data) => {
        const periodKeys = Object.keys(data["by_period"]); // Extract the periods from the API response
        setPeriods(periodKeys); // Save the periods in state
        if (periodKeys.length > 0) {
          const initialPeriod = periodKeys[0]; // Use the first period by default
          updateChartData(data, initialPeriod, metric); // Load the chart data for the initial period
        }
      })
      .catch((error) => console.error('Error fetching distribution data:', error)); // Log errors for debugging
  }, [metric]); // Re-run the effect whenever the metric changes

  /**
   * Updates the chart data based on the selected period and metric.
   * @param {Object} data - The API response data.
   * @param {string} period - The currently selected period (e.g., a month).
   * @param {string} metric - The selected metric ('saidi' or 'saifi').
   */
  const updateChartData = (data, period, metric) => {
    const periodData = data["by_period"][period]["distribucion"]; // Access distribution data for the selected period
    const districtNames = Object.keys(periodData); // Extract district names
    const values = districtNames.map((district) =>
      parseFloat(periodData[district][metric]) // Extract values for the selected metric
    );

    setLabels(districtNames); // Set the labels (districts) for the chart
    setDistributionData(values); // Set the data values (SAIDI or SAIFI)
  };

  /**
   * Handles navigation between periods (e.g., previous or next month).
   * @param {number} direction - The navigation direction (-1 for previous, +1 for next).
   */
  const handlePeriodChange = (direction) => {
    setCurrentPeriodIndex((prevIndex) => {
      let newIndex = prevIndex + direction; // Calculate the new index
      if (newIndex < 0) newIndex = periods.length - 1; // Wrap around to the last period
      if (newIndex >= periods.length) newIndex = 0; // Wrap around to the first period
      updateChartDataFromIndex(newIndex, metric); // Update the chart data for the new period
      return newIndex;
    });
  };

  /**
   * Fetches and updates chart data for the selected period index and metric.
   * @param {number} index - The index of the selected period.
   * @param {string} metric - The selected metric ('saidi' or 'saifi').
   */
  const updateChartDataFromIndex = (index, metric) => {
    fetch('http://127.0.0.1:5000/indices/todos') // Fetch data from the backend API
      .then((response) => response.json())
      .then((data) => {
        const period = periods[index]; // Get the period corresponding to the index
        updateChartData(data, period, metric); // Update the chart with the new period's data
      })
      .catch((error) => console.error('Error fetching distribution data:', error)); // Log errors for debugging
  };

  // Configuration for the bar chart
  const data = {
    labels: labels, // District names for the x-axis
    datasets: [
      {
        label: `Distribution Data (${metric.toUpperCase()} Periodo ${periods[currentPeriodIndex] || ''})`,
        data: distributionData, // Data values (SAIDI or SAIFI)
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
    ],
  };

  // Chart.js options for styling and behavior
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize dynamically
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)', // Legend text color
          font: { size: 14 }, // Legend font size
        },
        position: 'top', // Place legend at the top
      },
      title: {
        display: true,
        text: `Distribution Data (${metric.toUpperCase()}) by District`, // Dynamic title
        color: 'rgba(255, 255, 255, 0.85)', // Title color
        font: { size: 16, weight: 'bold' }, // Title font styling
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Tooltip background color
        titleColor: '#ffffff', // Tooltip title color
        bodyColor: '#ffffff', // Tooltip body text color
        borderColor: 'rgba(255, 255, 255, 0.3)', // Tooltip border color
        borderWidth: 1, // Tooltip border width
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)', // X-axis tick color
          font: { size: 12 }, // X-axis tick font size
        },
        grid: { display: false }, // Hide grid lines for x-axis
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)', // Y-axis tick color
          font: { size: 12 }, // Y-axis tick font size
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }, // Y-axis grid line color
      },
    },
  };

  return (
    <div className="py-8">
      {/* Chart Container */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg shadow-lg p-8">
        {/* Metric Toggle Buttons */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setMetric('saidi')}
            className={`px-4 py-2 mx-2 rounded-lg ${
              metric === 'saidi' ? 'bg-gradient-to-r from-purple-700 to-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            SAIDI
          </button>
          <button
            onClick={() => setMetric('saifi')}
            className={`px-4 py-2 mx-2 rounded-lg ${
              metric === 'saifi' ? 'bg-gradient-to-r from-purple-700 to-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            SAIFI
          </button>
        </div>

        {/* Chart Display */}
        <div className="h-96">
          <Bar data={data} options={options} />
        </div>

        {/* Period Navigation Buttons */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePeriodChange(-1)}
            className="px-4 py-2 mx-2 rounded-lg bg-gradient-to-r from-purple-700 to-blue-500 text-white shadow-md hover:opacity-90"
          >
            Previous
          </button>
          <button
            onClick={() => handlePeriodChange(1)}
            className="px-4 py-2 mx-2 rounded-lg bg-gradient-to-r from-purple-700 to-blue-500 text-white shadow-md hover:opacity-90"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisBarchart;
