import styles from './Class.module.css';
import Menu from '../../../../components/Student/Menu/Menu';
import Panel from '../../../../components/Panel/Panel';
import icons from '../../../../assets/images/icons/icons';
import React from 'react';
import Loading from '../../../../components/Student/Loading/Loading';
import { getAluno } from '../../../../functions/Alunos';
import Cookies from 'js-cookie';

const Class = () => {
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
    <div className={styles.classesContainer}>
      <Menu studentName={student.nome_completo} />
      <div className={styles.classesSideContent}>
        <Panel pageName="Painel do Aluno" section="Consultas/Aulas" color="#F66B0E" />
        <div className={styles.classesInfo}>
          <div className={styles.classesCard}>
            <div className={styles.classesCardTitle}>
              <p>Aulas</p>
              <hr />
            </div>

            <div className={styles.classesCardTable}>
              <div className={styles.classesCardTableBody}>
                <div className={styles.classesBody}>
                  <p>SEGUNDA-FEIRA</p>
                  <div className={styles.classesDayBody}>
                    <div className={styles.classesHour}>
                      <p className={styles.classesHourTitle}>POO</p>

                      <div className={styles.classesName}>
                        <hr />
                        <span>Programação Orientada a Objetos</span>
                      </div>

                      <div className={styles.classesDuration}>
                        <div className={styles.classesBegin}>
                          <p>Início</p>
                          <span>18:30</span>
                        </div>

                        <div className={styles.classesEnd}>
                          <p>Fim</p>
                          <span>19:20</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.classesHour}>
                      <p className={styles.classesHourTitle}>POO</p>

                      <div className={styles.classesName}>
                        <hr />
                        <span>Programação Orientada a Objetos</span>
                      </div>

                      <div className={styles.classesDuration}>
                        <div className={styles.classesBegin}>
                          <p>Início</p>
                          <span>19:20</span>
                        </div>

                        <div className={styles.classesEnd}>
                          <p>Fim</p>
                          <span>20:10</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.classesHour}>
                      <p className={styles.classesHourTitle}>DW</p>

                      <div className={styles.classesName}>
                        <hr />
                        <span>Desenvolvimento Web</span>
                      </div>

                      <div className={styles.classesDuration}>
                        <div className={styles.classesBegin}>
                          <p>Início</p>
                          <span>20:10</span>
                        </div>

                        <div className={styles.classesEnd}>
                          <p>Fim</p>
                          <span>21:00</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.classesHour}>
                      <p className={styles.classesHourTitle}>CDI</p>

                      <div className={styles.classesName}>
                        <hr />
                        <span>Cálculo Diferencial e Integral</span>
                      </div>

                      <div className={styles.classesDuration}>
                        <div className={styles.classesBegin}>
                          <p>Início</p>
                          <span>21:20</span>
                        </div>

                        <div className={styles.classesEnd}>
                          <p>Fim</p>
                          <span>22:10</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.classesHour}>
                      <p className={styles.classesHourTitle}>CDI</p>

                      <div className={styles.classesName}>
                        <hr />
                        <span>Cálculo Diferencial e Integral</span>
                      </div>

                      <div className={styles.classesDuration}>
                        <div className={styles.classesBegin}>
                          <p>Início</p>
                          <span>22:10</span>
                        </div>

                        <div className={styles.classesEnd}>
                          <p>Fim</p>
                          <span>22:50</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p>TERÇA-FEIRA</p>
                  <div className={styles.classesDayBody}>
                    <div className={styles.classesHour}>
                      <p className={styles.classesHourTitle}>POO</p>

                      <div className={styles.classesName}>
                        <hr />
                        <span>Programação Orientada a Objetos</span>
                      </div>

                      <div className={styles.classesDuration}>
                        <div className={styles.classesBegin}>
                          <p>Início</p>
                          <span>18:30</span>
                        </div>

                        <div className={styles.classesEnd}>
                          <p>Fim</p>
                          <span>19:20</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.classesHour}>
                      <p className={styles.classesHourTitle}>POO</p>

                      <div className={styles.classesName}>
                        <hr />
                        <span>Programação Orientada a Objetos</span>
                      </div>

                      <div className={styles.classesDuration}>
                        <div className={styles.classesBegin}>
                          <p>Início</p>
                          <span>19:20</span>
                        </div>

                        <div className={styles.classesEnd}>
                          <p>Fim</p>
                          <span>20:10</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.classesHour}>
                      <p className={styles.classesHourTitle}>DW</p>

                      <div className={styles.classesName}>
                        <hr />
                        <span>Desenvolvimento Web</span>
                      </div>

                      <div className={styles.classesDuration}>
                        <div className={styles.classesBegin}>
                          <p>Início</p>
                          <span>20:10</span>
                        </div>

                        <div className={styles.classesEnd}>
                          <p>Fim</p>
                          <span>21:00</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.classesHour}>
                      <p className={styles.classesHourTitle}>CDI</p>

                      <div className={styles.classesName}>
                        <hr />
                        <span>Cálculo Diferencial e Integral</span>
                      </div>

                      <div className={styles.classesDuration}>
                        <div className={styles.classesBegin}>
                          <p>Início</p>
                          <span>21:20</span>
                        </div>

                        <div className={styles.classesEnd}>
                          <p>Fim</p>
                          <span>22:10</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.classesHour}>
                      <p className={styles.classesHourTitle}>CDI</p>

                      <div className={styles.classesName}>
                        <hr />
                        <span>Cálculo Diferencial e Integral</span>
                      </div>

                      <div className={styles.classesDuration}>
                        <div className={styles.classesBegin}>
                          <p>Início</p>
                          <span>22:10</span>
                        </div>

                        <div className={styles.classesEnd}>
                          <p>Fim</p>
                          <span>22:50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.classesCardFooter}>
              <span>
                Total de <b>7</b> registros
              </span>

              <div className={styles.classesFooterPages}>
                <div className={styles.classesPageChecked}>
                  <span>1</span>
                </div>

                <div className={styles.classesPage}>
                  <span>2</span>
                </div>

                <div className={styles.classesPage}>
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

export default Class;
