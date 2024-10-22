import express from 'express';
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/usuarios', getUsers);
router.post('/usuarios', createUser);
router.get('/usuarios/:id', getUserById);
router.put('/usuarios/:id', updateUser);
router.delete('/usuarios/:id', deleteUser);
router.post('/usuarios/login', loginUser);

export default router;
