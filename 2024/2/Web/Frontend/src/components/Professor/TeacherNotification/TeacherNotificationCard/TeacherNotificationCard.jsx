import styles from './TeacherNotificationCard.module.css';

const TeacherNotificationCard = ({ title, assignment }) => {
  return (
    <div className={styles.notificationCard}>
      <div className={styles.notificationCardContent}>
        <div className={styles.notificationCardTitle}>
          <h3>{title}:</h3>
        </div>
        <p className={styles.notificationAssignment}>{assignment}</p>
      </div>
    </div>
  );
};

export default TeacherNotificationCard;
