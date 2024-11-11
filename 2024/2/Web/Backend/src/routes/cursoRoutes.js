import express from 'express';
import { getCourses, createCourse, getCourseById, updateCourse, deleteCourse } from '../controllers/cursoController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import validateSchema from '../middlewares/validateSchema.js';
import cursoSchema from '../schemas/cursoSchema.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Rota para gerenciamento de cursos
 */

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Retorna todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cursos'
 */
router.get('/', getCourses);

/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Cria um novo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cursos'
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cursos'
 *       400:
 *         description: Requisição inválida
 */
router.post('/', cursoSchema, validateSchema, createCourse);

/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     summary: Retorna um curso pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cursos'
 *       404:
 *         description: Curso não encontrado
 */
router.get('/:id', getCourseById);

/**
 * @swagger
 * /cursos/{id}:
 *   put:
 *     summary: Atualiza um curso pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cursos'
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cursos'
 *       404:
 *         description: Curso não encontrado
 */
router.put('/:id', cursoSchema, validateSchema, updateCourse);

/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Deleta um curso pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     responses:
 *       204:
 *         description: Curso deletado com sucesso
 *       404:
 *         description: Curso não encontrado
 */
router.delete('/:id', deleteCourse);

/**
 * @swagger
 * components:
 *   schemas:
 *     Cursos:
 *       type: object
 *       required:
 *         - nome_curso
 *       properties:
 *         id_curso:
 *           type: integer
 *           description: ID do curso (auto-incrementado)
 *         nome_curso:
 *           type: string
 *           description: Nome do curso
 *         descricao_curso:
 *           type: string
 *           description: Descrição do curso
 *         duracao:
 *           type: string
 *           description: Duração do curso
 *         categoria:
 *           type: string
 *           description: Categoria do curso
 *         nivel:
 *           type: string
 *           description: Nível do curso (básico, intermediário, avançado)
 *         carga_horaria:
 *           type: integer
 *           description: Carga horária do curso em horas
 *         data_inicio:
 *           type: string
 *           format: date
 *           description: Data de início do curso
 *         data_fim:
 *           type: string
 *           format: date
 *           description: Data de fim do curso
 *       example:
 *         nome_curso: "Desenvolvimento Web"
 *         descricao_curso: "Curso completo de desenvolvimento web"
 *         duracao: "6 meses"
 *         categoria: "Tecnologia"
 *         nivel: "Intermediário"
 *         carga_horaria: 120
 *         data_inicio: "2024-01-01"
 *         data_fim: "2024-06-30"
 */

export default router;
