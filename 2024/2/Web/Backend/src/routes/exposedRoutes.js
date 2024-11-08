import express from 'express';
import { getStudents } from '../controllers/alunoController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Consumo
 *   description: Rota para ser consumida por outros semestres
 */

/**
 * @swagger
 * /dms-4/consumo:
 *   get:
 *     summary: Retorna todos os alunos
 *     tags: [Consumo]
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
router.get('/dsm-4/consumo', getStudents);

export default router;
