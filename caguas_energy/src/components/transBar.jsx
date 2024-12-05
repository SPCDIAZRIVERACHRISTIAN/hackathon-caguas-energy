import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/*
Todo:
1- poder visualizar los demas meses en la tabla de transmission
2- poder visualizar los demas meses en la tabla de distribution
3- Crear una tabla de distribucion
4- poder circular entre los meses en la tabla  o poder seleeccionar
5- Opcional crear una base de tatos para almacenar la data
*/

const TransBarchart = () => {
  const [transmissionData, setTransmissionData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // Fetch transmission data
    fetch('http://127.0.0.1:5000/indices/todos')
      .then((response) => response.json())
      .then((data) => {
        // Extract data from the "transmision" key in "by_period"
        const periodData = data["by_period"]["01-31-2022"]["transmision"];

        // Extract district names (labels) and SAIDI values (data)
        const districtNames = Object.keys(periodData);
        const saidiValues = districtNames.map(
          (district) => parseFloat(periodData[district]["saidi"]) // Parse SAIDI values
        );

        // Update state
        setLabels(districtNames);
        setTransmissionData(saidiValues);
      })
      .catch((error) => console.error('Error fetching transmission data:', error));
  }, []);

  const data = {
    labels: labels, // Districts like 'AGUADILLA', 'ARECIBO', etc.
    datasets: [
      {
        label: 'Transmission Data (SAIDI Periodo 01-01-2022 to 01-31-2022)',
        data: transmissionData, // SAIDI values
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
        text: 'Transmission Data (SAIDI) by District',
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

export default TransBarchart;
