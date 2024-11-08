import styles from './AcademyHome.module.css';
import Menu from '../../../components/Academy/AcademyMenu/AcademyMenu';
import Panel from '../../../components/Panel/Panel';
import AcademyOverviewCards from '../../../components/Academy/AcademyOverviewCards/AcademyOverviewCards';
import AcademyStudentChart from '../../../components/Academy/AcademyStudentChart/AcademyStudentChart';
import AcademyClassChart from '../../../components/Academy/AcademyClassChart/AcademyClassChart';

const AcademyHome = () => {
  return (
    <div className={styles.academyHomeContainer}>
      <div className={styles.academyHomeMenu}>
        <Menu academyName={'Academy'} />
      </div>
      <div className={styles.academyHomeMainContent}>
        <div className={styles.academyHomeSideContents}>
          <Panel pageName="Portal Acadêmico" section="Início" color="#F66B0E" />
          <div className={styles.academyHomeInfo}>
            <div className={styles.academyOverviewCards}>
              <AcademyOverviewCards/>
            </div>
            <div className={styles.academyOverview}>
              <AcademyStudentChart/>
              <AcademyClassChart/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyHome;
