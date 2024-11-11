import React from 'react';
import StudentHome from '../../../components/Student/Home/StudentHome';
import Loading from '../../../components/Student/Loading/Loading';
import { getAluno } from '../../../functions/Alunos';
import Cookies from 'js-cookie';

const Home = () => {
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

  return isLoading ? <Loading /> : <StudentHome name={student.nome_completo} cpf={student.cpf} ra={student.RA} />;
};

export default Home;
