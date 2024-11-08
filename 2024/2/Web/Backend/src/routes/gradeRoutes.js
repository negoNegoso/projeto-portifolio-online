import express from 'express';

import {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
  deleteGrade,
} from '../controllers/gradeController.js';
import validateSchema from '../middlewares/validateSchema.js';
import gradeSchema from '../schemas/gradeSchema.js';

const router = express.Router();

// Criar uma nova nota
router.post('/', gradeSchema, validateSchema, createGrade);

// Route para listar notas
router.get('/', getAllGrades);

// Route para pegar nota pelo id
router.get('/:id', getGradeById);

// Route para atualizar nota
router.put('/:id', gradeSchema, validateSchema, updateGrade);

// Route para apagar a nota
router.delete('/:id', deleteGrade);

export default router;
