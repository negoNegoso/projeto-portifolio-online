import styles from './TeacherHome.module.css';
import Menu from '../../../components/Professor/TeacherMenu/TeacherMenu';
import Panel from '../../../components/Panel/Panel';
import TeacherCalendar from '../../../components/Professor/TeacherCalendarPanel/TeacherCalendar';
import TeacherNotificationPanel from '../../../components/Professor/TeacherNotification/TeacherNotificationPanel/TeacherNotificationPanel';
import TeacherSchedulePanel from '../../../components/Professor/TeacherSchedule/TeacherSchedulePanel/TeacherSchedulePanel';

const TeacherHome = () => {
  return (
    <div className={styles.teacherHomeContainer}>
      <div className={styles.teacherHomeMenu}>
        <Menu studentName={'Professora'} />
      </div>
      <div className={styles.teacherHomeMainContent}>
        <div className={styles.teacherHomeSideContents}>
          <Panel pageName="Portal do Professor" section="Início" color="#F66B0E" />
          <div className={styles.teacherHomeInfo}>
            <div className={styles.teacherCalendar}>
              <TeacherCalendar />
            </div>
            <div className={styles.teacherOverview}>
              <TeacherSchedulePanel />
              <div className={styles.homeNotificationPanel}>
                <TeacherNotificationPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
