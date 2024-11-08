import styles from './AcademyOverviewCards.module.css';
import icons from '../../../assets/images/icons/icons';

const totalStudent = '150';
const totalProfessor = '20';
const totalDegree = '02';
const totalClass = '12';

const AcademyOverviewCards = () => {
  return (
    <div className={styles.academyOverviewContainer}>
      <div className={styles.academyOverviewEvents}>
        <div className={styles.academyOverviewCard}>
          <div className={styles.academyOverviewCardContent}>
            <div className={styles.academyOverviewCardText}>
              <span>Total de Alunos</span>
              <h3>{totalStudent}</h3>
            </div>
            <img src={icons.dashboardStudent.src} alt={icons.dashboardStudent.alt}/>
          </div>
        </div>
        <div className={styles.academyOverviewCard}>
          <div className={styles.academyOverviewCardContent}>
            <div className={styles.academyOverviewCardText}>
              <span>Professores</span>
              <h3>{totalProfessor}</h3>
            </div>
            <img src={icons.students.src} alt={icons.students.alt} />
          </div>
        </div>
        <div className={styles.academyOverviewCard}>
          <div className={styles.academyOverviewCardContent}>
            <div className={styles.academyOverviewCardText}>
              <span>Total de Cursos</span>
              <h3>{totalDegree}</h3>
            </div>
            <img src={icons.dashboardDegree.src} alt={icons.dashboardDegree.alt} />
          </div>
        </div>
        <div className={styles.academyOverviewCard}>
          <div className={styles.academyOverviewCardContent}>
            <div className={styles.academyOverviewCardText}>
              <span>Total de Turmas</span>
              <h3>{totalClass}</h3>
            </div>
            <img src={icons.dashboardClass.src} alt={icons.dashboardClass.alt} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyOverviewCards;
