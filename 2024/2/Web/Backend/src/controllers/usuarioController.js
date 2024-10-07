import Users from '../models/usuarios.js';
import bcrypt from 'bcrypt';
import { login } from '../services/authService.js';

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { nome_completo, email, senha, tipo_usuario } = req.body;

  try {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'email já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const currentTime = new Date().toTimeString().split(' ')[0];

    const user = await Users.create({
      nome_completo,
      email,
      senha: hashedPassword,
      tipo_usuario,
      data_criacao: currentTime,
      status: 'ativo',
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'usuário não encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome_completo, email, senha, tipo_usuario, status } = req.body;

  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'usuário não encontrado.' });
    }

    const updateData = {
      nome_completo,
      email,
      tipo_usuario,
      status,
    };

    if (senha) {
      updateData.senha = await bcrypt.hash(senha, 10);
    }

    await Users.update(updateData, { where: { id_usuario: id } });
    res.json({ message: 'usuário atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Users.destroy({ where: { id_usuario: id } });
    if (!deleted) {
      return res.status(404).json({ message: 'usuário não encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const { user, token } = await login(email, senha);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export { getUsers, createUser, getUserById, updateUser, deleteUser, loginUser };
