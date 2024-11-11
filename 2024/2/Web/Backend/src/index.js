import express from 'express';
import sequelize from './config/database.js';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import alunosRoutes from './routes/alunoRoutes.js';
import usuariosRoutes from './routes/usuarioRoutes.js';
import turmaRoutes from './routes/turmaRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';
import gradeRoutes from './routes/gradeRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import rollCallRoutes from './routes/rollCallRoutes.js';
import exposedRoutes from './routes/exposedRoutes.js';
import swaggerDocs from './config/swagger.js';
import { verifyToken } from './middlewares/authMiddleware.js';
import Users from './models/Usuarios.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

swaggerDocs(app);

app.use(cors());

const openRoutes = ['/api-docs/', '/alunos/login', '/usuarios/login', '/dsm-4/consumo'];

app.use((req, res, next) => {
  if (openRoutes.includes(req.path)) {
    return next();
  }
  verifyToken(req, res, next);
});

app.use(express.json());

app.use('/alunos', alunosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/turmas', turmaRoutes);
app.use('/cursos', cursoRoutes);
app.use('/notas', gradeRoutes);
app.use('/materias', subjectRoutes);
app.use('/chamadas', rollCallRoutes);
app.use('/dsm-4', exposedRoutes);

const run = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida.');

    await sequelize.sync({ alter: true });
    console.log('Sincronização realizada com sucesso');

    const admin = await Users.findOne({ where: { tipo_usuario: 'Administrador' } });
    if (!admin) {
      console.log('Nenhum usuário admin encontrado. Criando um novo usuário admin...');

      const hashedPassword = await bcrypt.hash('adminpassword', 10);

      const defaultAdmin = await Users.create({
        nome_completo: 'Admin da Silva',
        email: 'admin@praxis.com',
        senha: hashedPassword,
        tipo_usuario: 'Administrador',
        status: 'active',
        caminho_da_foto: '',
      });

      console.log('Usuário admin criado:', defaultAdmin.nome_completo);
    }

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Não foi possivel conectar com o banco de dados:', error);
  }
};

run();
