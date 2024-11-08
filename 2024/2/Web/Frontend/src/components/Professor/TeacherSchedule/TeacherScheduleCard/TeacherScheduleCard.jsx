import icons from '../../../../assets/images/icons/icons';
import styles from './TeacherScheduleCard.module.css';

const colors = {
  Matematica: '#F66B0E',
  Historia: '#3C5874',
};

const TeacherScheduleCard = ({ date, time, subject, lesson, methodology }) => {
  const subjectColor = colors[subject] || '#E0E0E0';

  return (
    <div className={styles.scheduleCard}>
      <div className={styles.scheduleDateTime}>
        <div className={styles.scheduleDateTimeInfo}>
          <img src={icons.calendarSchedule.src} alt={icons.calendarSchedule.alt} />
          <p>{date}</p>
        </div>
        <div className={styles.scheduleDateTimeInfo}>
          <img src={icons.clockSchedule.src} alt={icons.clockSchedule.alt} />
          <p>{time}</p>
        </div>
      </div>
      <div className={styles.subjectColorLine} style={{ backgroundColor: subjectColor }}></div>
      <div className={styles.scheduleInfo}>
        <p>
          <strong>Matéria:</strong> {subject}
        </p>
        <p>
          <strong>Conteúdo:</strong> {lesson}
        </p>
        <p>
          <strong>Metodologia:</strong> {methodology}
        </p>
      </div>
    </div>
  );
};

export default TeacherScheduleCard;
