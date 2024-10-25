import express from 'express';
import {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/alunoController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/alunos', getStudents);
router.post('/alunos', createStudent);
router.get('/alunos/:id', getStudentById);
router.put('/alunos/:id', updateStudent);
router.delete('/alunos/:id', deleteStudent);

export default router;
