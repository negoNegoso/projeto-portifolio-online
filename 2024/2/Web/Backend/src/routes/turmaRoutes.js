import express from 'express';
import { getTurmas, createTurma, getTurmaById, updateTurma, deleteTurma } from '../controllers/turmaController.js';

const router = express.Router();

router.get('/turmas', getTurmas);
router.post('/create-turma', createTurma);
router.get('/get-turma/:id', getTurmaById);
router.put('/update-turma/:id', updateTurma);
router.delete('/delete-turma/:id', deleteTurma);

export default router;
