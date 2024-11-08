import styles from './TeacherCalendar.module.css';

const calendarEvents = [
  { id: 1, date: '22/10/2024', time: '12:30-13:00', event: 'Reunião', description: 'coisa importante' },
  { id: 2, date: '13/11/2024', time: '12:30-13:00', event: 'Reunião', description: 'coisa importante' },
  { id: 3, date: '24/11/2024', time: '12:30-13:00', event: 'Reunião', description: 'coisa importante' },
];

const TeacherCalendar = () => {
  return (
    <div className={styles.teacherCalendarContainer}>
      <div className={styles.teacherCalendarSubContainer}>
        <div className={styles.teacherCalendarTitle}>
          <h2>Calendário</h2>
          <div className={styles.teacherCalendarLine}></div>
        </div>
        <div className={styles.teacherCalendarEvents}>
          {calendarEvents.map((event) => (
            <div key={event.id} className={styles.teacherCalendarEvent}>
              <span>{event.date}</span>
              <hr />
              <div className={styles.teacherCalendarList}>
                <ul>
                  <li>
                    {event.time} - {event.event}
                  </li>
                  <li>{event.description}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <a href="#" className={styles.teacherCalendarSeeMore}>
          Ver mais
        </a>
      </div>
    </div>
  );
};

export default TeacherCalendar;
