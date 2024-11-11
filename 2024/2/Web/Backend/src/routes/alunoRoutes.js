import express from 'express';
import {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  login,
} from '../controllers/alunoController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import validateSchema from '../middlewares/validateSchema.js';
import alunoSchema from '../schemas/alunoSchema.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Rota para gerenciamento de alunos
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Retorna todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alunos'
 */
router.get('/', getStudents);

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alunos'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alunos'
 *       400:
 *         description: Requisição inválida
 */
router.post('/', alunoSchema, validateSchema, createStudent);

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Retorna um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alunos'
 *       404:
 *         description: Aluno não encontrado
 */
router.get('/:id', getStudentById);

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alunos'
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alunos'
 *       404:
 *         description: Aluno não encontrado
 */
router.put('/:id', alunoSchema, validateSchema, updateStudent);

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Deleta um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       204:
 *         description: Aluno deletado com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.delete('/:id', deleteStudent);

/**
 * @swagger
 * /alunos/login:
 *   post:
 *     summary: Realiza o login de um aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro ao realizar o login
 */
router.post('/login', login);

/**
 * @swagger
 * components:
 *   schemas:
 *     Alunos:
 *       type: object
 *       required:
 *         - nome_completo
 *         - RA
 *         - senha
 *         - documento_identidade
 *         - cpf
 *       properties:
 *         id_aluno:
 *           type: integer
 *           description: ID do aluno (auto-incrementado)
 *         nome_completo:
 *           type: string
 *           description: Nome completo do aluno
 *         RA:
 *           type: integer
 *           description: Registro Acadêmico do aluno
 *         senha:
 *           type: string
 *           description: Senha do aluno
 *         data_nascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento do aluno
 *         genero:
 *           type: string
 *           description: Gênero do aluno
 *         endereco:
 *           type: string
 *           description: Endereço do aluno
 *         email:
 *           type: string
 *           description: Email do aluno
 *         telefone:
 *           type: string
 *           description: Telefone do aluno
 *         documento_identidade:
 *           type: string
 *           description: Documento de identidade do aluno
 *         cpf:
 *           type: string
 *           description: CPF do aluno (11 dígitos)
 *         data_matricula:
 *           type: string
 *           format: date
 *           description: Data de matrícula do aluno
 *         numero_matricula:
 *           type: string
 *           description: Número de matrícula do aluno
 *         id_curso:
 *           type: integer
 *           description: ID do curso que o aluno está matriculado
 *         id_turma:
 *           type: integer
 *           description: ID da turma do aluno
 *         caminho_da_foto:
 *           type: string
 *           description: Caminho para a foto do aluno
 *       example:
 *         nome_completo: João da Silva
 *         RA: 123456
 *         senha: senha123
 *         documento_identidade: 123456789
 *         cpf: 12345678901
 *         data_nascimento: "2000-01-01"
 *         genero: Masculino
 *         endereco: Rua Exemplo, 123
 *         email: joao@example.com
 *         telefone: "1234567890"
 */

export default router;
