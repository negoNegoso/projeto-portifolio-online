import Menu from '../Menu/Menu';
import Panel from '../../Panel/Panel';
import styles from './Loading.module.css';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className={styles.homeContainer}>
      <Menu studentName={'Ana Clara'} />
      <div className={styles.homeSideContents}>
        <Panel pageName="Painel do Aluno" section="Início" color="#F66B0E" />
        <div className={styles.homeInfo}>
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Por favor, aguarde enquanto estamos carregando...</span>
            </Spinner>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
