import Users from '../models/Usuarios.js';
import Students from '../models/Alunos.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

const loginUser = async (email, senha) => {
  try {
    let usuario = await Users.findOne({ where: { email } });
    if (!usuario) {
      throw new Error('usuário não encontrado.');
    }

    const hashedPassword = usuario.senha.toString();

    const passwd = await bcrypt.compare(senha, hashedPassword);
    if (!passwd) {
      throw new Error('senha incorreta.');
    }

    usuario = usuario.toJSON ? usuario.toJSON() : { ...usuario.get() };
    delete usuario.senha;

    const token = jwt.sign({ id: usuario.id_usuario, role: usuario.tipo_usuario }, JWT_SECRET, { expiresIn: '1h' });

    return { usuario, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginStudent = async (email, senha) => {
  try {
    let aluno = await Students.findOne({ where: { email } });
    if (!aluno) {
      throw new Error('usuario não encontrado.');
    }

    const passwd = await bcrypt.compare(senha, aluno.senha);
    if (!passwd) {
      throw new Error('senha incorreta.');
    }

    aluno = aluno.toJSON ? aluno.toJSON() : { ...aluno.get() };
    delete aluno.senha;

    const token = jwt.sign({ id: aluno.id_aluno }, JWT_SECRET, { expiresIn: '1h' });

    return { aluno, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { loginUser, loginStudent };
