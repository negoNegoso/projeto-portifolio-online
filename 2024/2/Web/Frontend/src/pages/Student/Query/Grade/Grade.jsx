import styles from './Grade.module.css';
import Menu from '../../../../components/Student/Menu/Menu';
import icons from '../../../../assets/images/icons/icons';
import Panel from '../../../../components/Panel/Panel';
import React from 'react';
import Loading from '../../../../components/Student/Loading/Loading';
import { getAluno } from '../../../../functions/Alunos';
import Cookies from 'js-cookie';

const Grades = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [student, setStudent] = React.useState([]);

  const fetchData = async () => {
    setIsLoading(true);

    const token = Cookies.get('token');
    const id = Cookies.get('id');

    if (token && id) {
      const responseFindAlunoById = await getAluno(token, id);
      console.log(responseFindAlunoById);
      setStudent(responseFindAlunoById);
    }

    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className={styles.gradesContainer}>
      <Menu studentName={student.nome_completo} />
      <div className={styles.gradesSideContent}>
        <Panel pageName="Painel do Aluno" section="Consultas/Notas" color="#F66B0E" />

        <div className={styles.gradesInfo}>
          <div className={styles.gradesCard}>
            <div className={styles.gradesCardTitle}>
              <p>Notas</p>
              <hr />
            </div>

            <div className={styles.gradeCardSubject}>
              <span>Disciplina: </span>
              <select name="subject">
                <option>Disciplina</option>
                <option value="LDW">LDW</option>
                <option value="PDM">PDM</option>
                <option value="IEC">IEC</option>
                <option value="EA">EA</option>
              </select>
            </div>

            <div className={styles.gradesCardTables}>
              <div className={styles.gradesCardTable}>
                <div className={styles.gradesCardTableHeader}>
                  <div className={styles.gradesHeader}>
                    <span>Nome Matéria 1</span>
                    <span>Nota Geral</span>
                  </div>

                  <hr />
                </div>

                <div className={styles.gradesCardTableBody}>
                  <div>
                    <div className={styles.gradesBody}>
                      <span>Atividade</span>
                      <span>Nota</span>
                    </div>

                    <hr />
                  </div>

                  <div>
                    <div className={styles.gradesBody}>
                      <span>Atividade</span>
                      <span>Nota</span>
                    </div>

                    <hr />
                  </div>

                  <div>
                    <div className={styles.gradesBody}>
                      <span>Atividade</span>
                      <span>Nota</span>
                    </div>

                    <hr />
                  </div>

                  <div>
                    <div className={styles.gradesBody}>
                      <span>Atividade</span>
                      <span>Nota</span>
                    </div>

                    <hr />
                  </div>
                </div>
              </div>

              <div className={styles.gradesCardTable}>
                <div className={styles.gradesCardTableHeader}>
                  <div className={styles.gradesHeader}>
                    <span>Nome Matéria 1</span>
                    <span>Nota Geral</span>
                  </div>

                  <hr />
                </div>

                <div className={styles.gradesCardTableBody}>
                  <div>
                    <div className={styles.gradesBody}>
                      <span>Atividade</span>
                      <span>Nota</span>
                    </div>

                    <hr />
                  </div>

                  <div>
                    <div className={styles.gradesBody}>
                      <span>Atividade</span>
                      <span>Nota</span>
                    </div>

                    <hr />
                  </div>

                  <div>
                    <div className={styles.gradesBody}>
                      <span>Atividade</span>
                      <span>Nota</span>
                    </div>

                    <hr />
                  </div>

                  <div>
                    <div className={styles.gradesBody}>
                      <span>Atividade</span>
                      <span>Nota</span>
                    </div>

                    <hr />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.gradeCardFooter}>
              <span>
                Total de <b>7</b> registros
              </span>

              <div className={styles.gradeFooterPages}>
                <div className={styles.gradePageChecked}>
                  <span>1</span>
                </div>

                <div className={styles.gradePage}>
                  <span>2</span>
                </div>

                <div className={styles.gradePage}>
                  <span>3</span>
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

export default Grades;
