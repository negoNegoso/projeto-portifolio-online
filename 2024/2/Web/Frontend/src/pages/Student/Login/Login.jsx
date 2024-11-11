import React from 'react';
import styles from './Login.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import logos from '../../../assets/images/logos/logos';
import icons from '../../../assets/images/icons/icons';
import { loginAluno } from '../../../functions/Alunos';
import { loginUsuario } from '../../../functions/Usuarios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('Invalid Email').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState();

  const [isValueChecked, setIsValueChecked] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const studentLogin = async () => {
    const data = {
      email: email,
      senha: password,
    };

    const responseLogin = await loginAluno(data);

    if (!responseLogin.token) {
      setError('Falha ao realizar o login. Email ou senha incorretos.');
      return;
    }

    Cookies.set('token', responseLogin.token);
    Cookies.set('id', responseLogin.user.id_aluno);
    Cookies.set('name', responseLogin.user.nome_completo);
    Cookies.set('role', 'Aluno');

    const studentName = decodeURIComponent(Cookies.get('name'));
    console.log(`Usuario ${studentName} logado com sucesso (${Cookies.get('role')}).`);

    navigate('/student/home');
  };

  const employeeLogin = async () => {
    const data = {
      email: email,
      senha: password,
    };

    const responseLogin = await loginUsuario(data);

    if (!responseLogin.token) {
      setError('Falha ao realizar o login. Email ou senha incorretos.');
      return;
    }

    Cookies.set('token', responseLogin.token);
    Cookies.set('id', responseLogin.user.id_usuario);
    Cookies.set('name', responseLogin.user.nome_completo);
    Cookies.set('role', responseLogin.user.tipo_usuario);

    const studentName = decodeURIComponent(Cookies.get('name'));
    const role = Cookies.get('role');

    console.log(`Usuario ${studentName} logado com sucesso (${role}).`);

    if (role == 'Professor') {
      navigate('/professor/query/teacherHome');
    } else {
      navigate('/academy/query/academyHome');
    }
  };

  const login = async () => {
    switch (isValueChecked) {
      case 'student':
        studentLogin();
        break;
      case 'employee':
        employeeLogin();
        break;
      default:
        setError('Escolha uma opção de login.');
        break;
    }
  };

  return (
    <div className={styles.loginContainer}>
      <img src={logos.blueBig.src} alt={logos.blueBig.alt} id={styles.backgroundLogo} />
      <div className={styles.login}>
        <img src={logos.blue.src} alt={logos.blue.alt} id={styles.logo} />
        <div className={styles.content}>
          <div className={styles.loginTitle}>
            <h1>Portal de Acesso</h1>
            <p>Faça o login para acessar a sua conta</p>
          </div>
          <div className={styles.loginOption}>
            <div className={styles.option}>
              <input
                type="radio"
                name="option"
                value="student"
                onChange={(e) => setIsValueChecked(e.target.value)}
                checked={isValueChecked == 'student'}
              />
              <span>Aluno</span>
            </div>
            <div className={styles.option}>
              <input
                type="radio"
                name="option"
                value="employee"
                onChange={(e) => setIsValueChecked(e.target.value)}
                checked={isValueChecked == 'employee'}
              />
              <span>Funcionário</span>
            </div>
          </div>
          <form onSubmit={handleSubmit(login)}>
            <div className={styles.inputGroup}>
              {(errors.email || errors.password) && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <img
                    src={icons.error.src}
                    alt={icons.error.alt}
                    style={{ height: '30px', margin: '33px 10px 0px 0px' }}
                  />
                  <p style={{ color: 'red', whiteSpace: 'nowrap', margin: '32px 0px 16px 0px' }}>
                    Email ou senha incorreto. Tente novamente!
                  </p>
                </div>
              )}
              <img
                src={errors.email ? icons.emailRed.src : icons.email.src}
                alt={icons.email.alt}
                className={styles.imgInputs}
              />
              <input
                type="text"
                {...register('email')}
                onChange={(event) => setEmail(event.target.value)}
                className={errors.email ? styles.inputError : styles.inputFormStudent}
                placeholder="E-mail Institucional"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <img src={errors.password ? icons.lockRed.src : icons.lock.src} className={styles.imgInputs} />
              <input
                type="password"
                {...register('password')}
                onChange={(event) => setPassword(event.target.value)}
                className={errors.password ? styles.inputError : styles.inputFormStudent}
                placeholder="Senha"
                required
              />
            </div>

            <button type="submit" className={styles.loginButtonStudent}>
              Entrar
            </button>

            <div style={{ minHeight: '20px', marginTop: '10px', visibility: error ? 'visible' : 'hidden' }}>
              <p style={{ color: 'red' }}>{error}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
