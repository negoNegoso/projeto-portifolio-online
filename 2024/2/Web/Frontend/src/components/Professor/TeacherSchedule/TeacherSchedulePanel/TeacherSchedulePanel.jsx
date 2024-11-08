import styles from './TeacherSchedulePanel.module.css';
import TeacherScheduleCard from '../TeacherScheduleCard/TeacherScheduleCard';

const schedules = [
  {
    subject: 'Matematica',
    lesson: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec augue et ante imperdiet',
    methodology: 'Metodologia 1',
    date: '14/10',
    time: '14:30-15:20',
  },
  {
    subject: 'Historia',
    lesson: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec augue et ante imperdiet',
    methodology: 'Metodologia 2',
    date: '14/10',
    time: '14:30-15:20',
  },
  {
    subject: 'Matematica',
    lesson: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec augue et ante imperdiet',
    methodology: 'Metodologia 3',
    date: '14/10',
    time: '14:30-15:20',
  },
];

const TeacherSchedulePanel = () => {
  return (
    <div className={styles.teacherScheduleContainer}>
      <div className={styles.teacherScheduleSubContainer}>
        <div className={styles.teacherScheduleTitle}>
          <div className={styles.teacherScheduleTitleInfo}>
            <h2>Agenda</h2>
            <span>Ver semanas</span>
          </div>
          <div className={styles.teacherScheduleLine}></div>
        </div>
        {schedules.map((schedule) => (
          <TeacherScheduleCard
            key={schedule.id}
            subject={schedule.subject}
            lesson={schedule.lesson}
            methodology={schedule.methodology}
            date={schedule.date}
            time={schedule.time}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherSchedulePanel;
