import express from 'express';
import sequelize from './config/database.js';
import dotenv from 'dotenv';
import alunosRoutes from './routes/alunoRoutes.js';
import usuariosRoutes from './routes/usuarioRoutes.js';
import turmaRoutes from './routes/turmaRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';
import gradeRoutes from './routes/gradeRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import rollCallRoutes from './routes/rollCallRoutes.js';
import exposedRoutes from './routes/exposedRoutes.js';
import swaggerDocs from './config/swagger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
swaggerDocs(app);

app.use('/alunos', alunosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/turmas', turmaRoutes);
app.use('/cursos', cursoRoutes);
app.use('/notas', gradeRoutes);
app.use('/materias', subjectRoutes);
app.use('/chamadas', rollCallRoutes);
app.use('/', exposedRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const run = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida.');

    await sequelize.sync({ force: true });
    console.log('Sincronização realizada com sucesso');

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Não foi possivel conectar com o banco de dados:', error);
  }
};

run();
