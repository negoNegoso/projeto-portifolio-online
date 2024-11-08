import styles from './Absence.module.css';
import Menu from '../../../../components/Student/Menu/Menu';
import Panel from '../../../../components/Panel/Panel';
import icons from '../../../../assets/images/icons/icons';

const Absence = () => {
  return (
    <div className={styles.absenceContainer}>
      <Menu studentName={'Ana Clara'} />
      <div className={styles.absenceSideContent}>
        <Panel pageName="Painel do Aluno" section="Consultas/Faltas" color="#F66B0E" />
        <div className={styles.absenceInfo}>
          <div className={styles.absenceCard}>
            <div className={styles.absenceCardTitle}>
              <p>Faltas</p>
              <hr />
            </div>

            <div className={styles.absenceCardSubject}>
              <span>Disciplina: </span>
              <select name="subject">
                <option>Disciplina</option>
                <option value="LDW">LDW</option>
                <option value="PDM">PDM</option>
                <option value="IEC">IEC</option>
                <option value="EA">EA</option>
              </select>
            </div>

            <div className={styles.absenceCardTable}>
              <div className={styles.absenceCardTableHeader}>
                <div className={styles.absenceHeader}>
                  <h1>Matéria</h1>
                  <h1 className={styles.absenceHeaderAcronym}>Sigla</h1>
                  <h1 className={styles.absenceHeaderTotalClasses}>Total aulas</h1>
                  <h1>Total faltas</h1>
                </div>
              </div>

              <div className={styles.absenceCardTableBody}>
                <div>
                  <div className={styles.absenceBody}>
                    <h2>Nome da matéria</h2>
                    <h2>Sigla</h2>
                    <h2>18 aulas</h2>
                    <h2>2 faltas</h2>
                  </div>

                  <hr />
                </div>

                <div>
                  <div className={styles.absenceBody}>
                    <h2>Nome da matéria</h2>
                    <h2>Sigla</h2>
                    <h2>18 aulas</h2>
                    <h2>2 faltas</h2>
                  </div>

                  <hr />
                </div>

                <div>
                  <div className={styles.absenceBody}>
                    <h2>Nome da matéria</h2>
                    <h2>Sigla</h2>
                    <h2>18 aulas</h2>
                    <h2>2 faltas</h2>
                  </div>

                  <hr />
                </div>

                <div>
                  <div className={styles.absenceBody}>
                    <h2>Nome da matéria</h2>
                    <h2>Sigla</h2>
                    <h2>18 aulas</h2>
                    <h2>2 faltas</h2>
                  </div>

                  <hr />
                </div>

                <div>
                  <div className={styles.absenceBody}>
                    <h2>Nome da matéria</h2>
                    <h2>Sigla</h2>
                    <h2>18 aulas</h2>
                    <h2>2 faltas</h2>
                  </div>

                  <hr />
                </div>
              </div>
            </div>

            <div className={styles.absenceCardFooter}>
              <span>
                Total de <b>7</b> registros
              </span>

              <div className={styles.absenceFooterPages}>
                <div className={styles.absencePageChecked}>
                  <span>1</span>
                </div>

                <div className={styles.absencePage}>
                  <span>2</span>
                </div>

                <img src={icons.arrowRightDark.src} alt={icons.arrowRightDark.src} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Absence;
