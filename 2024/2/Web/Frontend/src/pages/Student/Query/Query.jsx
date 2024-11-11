import styles from './Query.module.css';
import Menu from '../../../components/Student/Menu/Menu';
import icons from '../../../assets/images/icons/icons';
import Panel from '../../../components/Panel/Panel';
import { Link } from 'react-router-dom';
import React from 'react';
import Loading from '../../../components/Student/Loading/Loading';
import { getAluno } from '../../../functions/Alunos';
import Cookies from 'js-cookie';

const Query = () => {
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
    <div className={styles.queryContainer}>
      <Menu studentName={student.nome_completo} />
      <div className={styles.querySideContent}>
        <Panel pageName="Painel do Aluno" section="Consultas" color="#F66B0E" />
        <div className={styles.queryInfo}>
          <div className={styles.queryTitle}>
            <p className={styles.queryTitleText}>Consultas</p>
          </div>
          <div className={styles.queryCard}>
            <div className={styles.cardTitles}>
              <Link id={styles.title} to={'/student/query/absence'}>
                <p>Faltas</p>
              </Link>
              <img src={icons.arrowLeft.src} alt={icons.arrowLeft.alt} />
            </div>
            <div className={styles.cardContent}>
              <p>Cheque suas faltas durante o semestre ou toda sua jornada acadêmica.</p>
            </div>
          </div>
          <div className={styles.queryCard}>
            <div className={styles.cardTitles}>
              <Link id={styles.title} to={'/student/query/grade'}>
                <p>Notas</p>
              </Link>
              <img src={icons.arrowLeft.src} alt={icons.arrowLeft.alt} />
            </div>
            <div className={styles.cardContent}>
              <p>Cheque suas notas durante o semestre ou toda sua jornada acadêmica.</p>
            </div>
          </div>
          <div className={styles.queryCard}>
            <div className={styles.cardTitles}>
              <Link id={styles.title} to={'/student/query/class'}>
                <p>Aulas</p>
              </Link>
              <img src={icons.arrowLeft.src} alt={icons.arrowLeft.alt} />
            </div>
            <div className={styles.cardContent}>
              <p>Cheque suas aulas de todo o curso e todo seu histórico de matérias.</p>
            </div>
          </div>
          <div className={styles.queryCard}>
            <div className={styles.cardTitles}>
              <Link id={styles.title} to={'/student/query/schoolReport'}>
                <p>Histórico</p>
              </Link>
              <img src={icons.arrowLeft.src} alt={icons.arrowLeft.alt} />
            </div>
            <div className={styles.cardContent}>
              <p>Cheque todo seu histórico da faculdade até hoje, de notas e faltas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Query;
