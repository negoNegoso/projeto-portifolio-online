import express from 'express';
import sequelize from './config/database.js';
import dotenv from 'dotenv';
import { Alunos, Cursos, Permissoes, Roles, Turmas, Usuarios } from './models'
import alunosRoutes from './routes/alunoRoutes.js';
import usuariosRoutes from './routes/usuarioRoutes.js';
import turmaRoutes from './routes/turmaRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', alunosRoutes);
app.use('/', usuariosRoutes);
app.use('/', turmaRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const run = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida.');

    await sequelize.sync();
    console.log('Sincronização realizada com sucesso');

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Não foi possivel conectar com o banco de dados:', error);
  }
};

run();
