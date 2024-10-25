// ./routes/cursoRoutes.js

import express from 'express';
import { getCourses, createCourse, getCourseById, updateCourse, deleteCourse } from '../controllers/cursoController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/cursos', getCourses);
router.post('/cursos', createCourse);
router.get('/cursos/:id', getCourseById);
router.put('/cursos/:id', updateCourse);
router.delete('/cursos/:id', deleteCourse);

export default router;
