import styles from './AcademyMenu.module.css';
import icons from '../../../assets/images/icons/icons';
import logos from '../../../assets/images/logos/logos';

const Menu = ({ academyName }) => {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuLogo}>
        <img src={logos.white.src} className={styles.whiteLogo} alt={logos.white.alt} />
      </div>
      <div className={styles.menuUserInfo}>
        <div className={styles.userImage}></div>
        <h4>{academyName}</h4>
        <h6>Academy</h6>
      </div>
      <div className={styles.menuConsult}>
        <div className={styles.consultTitle}>
          <p>Início</p>
          <div className={styles.string}></div>
        </div>
        <div className={styles.consultActions}>
          <div className={styles.consultItems}>
            <img src={icons.dashboard.src} alt={icons.dashboard.alt} />
            <p>Dashboard</p>
          </div>
        </div>
        <div className={styles.consultTitle}>
          <p>Matrículas</p>
          <div className={styles.string}></div>
        </div>
        <div className={styles.consultActions}>
          <div className={styles.consultItems}>
            <img src={icons.professorMenu.src} alt={icons.professorMenu.alt} />
            <p>Gestão de Professores</p>
          </div>
          <div className={styles.consultItems}>
            <img src={icons.studentMenu.src} alt={icons.studentMenu.alt} />
            <p>Gestão de Alunos</p>
          </div>
          <div className={styles.consultItems}>
            <img src={icons.book.src} alt={icons.book.alt} />
            <p>Gestão de Turmas</p>
          </div>
        </div>
      </div>
      <div className={styles.string2}></div>
      <div className={styles.menuActions}>
        <div className={styles.menuActionsImg}>
          <img src={icons.gear.src} alt={icons.gear.alt} />
          <p>Configurações</p>
        </div>
        <div className={styles.menuActionsImg}>
          <img src={icons.quit.src} alt={icons.quit.alt} />
          <p>Sair</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Menu;
