import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './AcademyStudentChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const AcademyStudentChart = () => {
  const data = {
    labels: ['Mulheres (50%)', 'Homens (50%)'],
    datasets: [
      {
        data: [75, 75],
        backgroundColor: ['#3C5874', '#F66B0E'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className={styles.chartStudentContainer}>
      <div className={styles.chartStudentContainerTitle}>
        <h2 className={styles.chartTitle}>Alunos</h2>
      </div>
      <Doughnut data={data} options={options} />
      <div className={styles.legendStudentContainer}>
        <div className={styles.legendStudentItem}>
          <span className={styles.legendStudentColor} style={{ backgroundColor: '#F66B0E' }}></span>
          <div className={styles.legendStudentItemInfo}>
            <span className={styles.legendStudentValue}>{data.datasets[0].data[0]}</span>
            <span className={styles.legendStudentLabel}>Homens (50%)</span>
          </div>
        </div>
        <div className={styles.legendStudentItem}>
          <span className={styles.legendStudentColor} style={{ backgroundColor: '#3C5874' }}></span>
          <div className={styles.legendStudentItemInfo}>
            <span className={styles.legendStudentValue}>{data.datasets[0].data[1]}</span>
            <span className={styles.legendStudentLabel}>Mulheres (50%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyStudentChart;
