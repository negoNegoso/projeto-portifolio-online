import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './AcademyClassChart.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AcademyClassChart = () => {
  const data = {
    labels: ['Turma1', 'Turma2', 'Turma3', 'Turma4', 'Turma5', 'Turma6'],
    datasets: [
      {
        data: [75, 60, 50, 80, 70, 90],
        backgroundColor: ['#F66B0E', '#FFA01E', '#F8CE68', '#637C98', '#475B77', '#243241'],
        borderWidth: 0,
        borderRadius: 5,
        barThickness: 40, 
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + '%';
          },
        },
        grid: {
          color: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw + '%';
          },
        },
      },
    },
  };

  return (
    <div className={styles.chartClassContainer}>
      <h2 className={styles.chartClassTitle}>Performance dos Alunos</h2>
      <Bar options={options} data={data} />
    </div>
  );
};

export default AcademyClassChart;
