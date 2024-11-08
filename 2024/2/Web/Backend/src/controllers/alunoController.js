import Students from '../models/Alunos.js';
import bcrypt from 'bcrypt';
import { loginStudent } from '../services/AuthService.js';
import { handleError, response } from '../Utils/Utils.js';

const getStudents = async (req, res) => {
  try {
    const students = await Students.findAll();
    return response(res, students);
  } catch (error) {
    return handleError(res, error);
  }
};

const createStudent = async (req, res) => {
  const {
    nome_completo,
    email,
    senha,
    RA,
    data_nascimento,
    genero,
    endereco,
    telefone,
    documento_identidade,
    cpf,
    caminho_da_foto,
    id_curso,
    id_turma,
  } = req.body;

  try {
    const existingStudent = await Students.findOne({ where: { email } });

    if (existingStudent) {
      return response(res, { message: 'Email ja cadastrado.' }, 400);
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const student = await Students.create({
      nome_completo: nome_completo,
      email: email,
      senha: hashedPassword,
      RA: RA,
      data_nascimento: data_nascimento,
      genero: genero,
      endereco: endereco,
      telefone: telefone,
      documento_identidade: documento_identidade,
      cpf: cpf,
      caminho_da_foto: null,
      id_curso: null,
      id_turma: null,
    });
    return response(res, student, 201);
  } catch (error) {
    return handleError(res, error);
  }
};

const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Students.findByPk(id);
    if (!student) {
      return response(res, { message: 'Aluno não encontrado' }, 404);
    }
    return response(res, student);
  } catch (error) {
    console.log(error);
    return handleError(res, error);
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Students.update(req.body, { where: { id_aluno: id } });
    if (!updated) {
      return response(res, { message: 'Aluno não encontrado' }, 404);
    }
    const updatedStudent = await Students.findByPk(id);
    res.json(updatedStudent);
    return response(res, updateStudent);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Students.destroy({ where: { id_aluno: id } });
    if (!deleted) {
      return response(res, { message: 'Aluno não encontrado' }, 404);
    }
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const { aluno, token } = await loginStudent(email, senha);
    return response(res, { user: aluno, token });
  } catch (error) {
    return handleError(res, error, 401);
  }
};

export { getStudents, createStudent, getStudentById, updateStudent, deleteStudent, login };
