import styles from './TeacherNotificationPanel.module.css';
import TeacherNotificationCard from '../TeacherNotificationCard/TeacherNotificationCard';

const notifications = [
  {
    id: 1,
    title: 'Aviso',
    assignment: 'Lorem ipsum dolor sit amet. Non esse facilis ut',
  },
  { id: 2, title: 'Atualização', assignment: 'Lorem ipsum dolor sit amet. Non esse facilis ut' },
  { id: 3, title: 'Alerta', assignment: 'Lorem ipsum dolor sit amet. Non esse facilis ut' },
];

const TeacherNotificationPanel = () => {
  return (
    <div className={styles.teacherNotificationContainer}>
      <div className={styles.teacherNotificationPanel}>
        <div className={styles.teacherNotificationHeader}>
          <div className={styles.teacherNotificationHeaderText}>
            <h2>Notificações</h2>
          </div>
        </div>
        {notifications.map((notification) => (
          <TeacherNotificationCard
            key={notification.id}
            title={notification.title}
            assignment={notification.assignment}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherNotificationPanel;
