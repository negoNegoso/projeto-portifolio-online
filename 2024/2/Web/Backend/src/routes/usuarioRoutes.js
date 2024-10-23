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

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

export default router;
