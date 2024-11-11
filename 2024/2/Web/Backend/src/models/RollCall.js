import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RollCall = sequelize.define(
  'chamadas',
  {
    id_chamada: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_aluno: {
      type: DataTypes.BIGINT,
      references: {
        model: 'alunos',
        key: 'id_aluno',
      },
    },
    id_turma: {
      type: DataTypes.BIGINT,
      references: {
        model: 'turmas',
        key: 'id_turma',
      },
    },
    id_materia: {
      type: DataTypes.BIGINT,
      references: {
        model: 'materias',
        key: 'id_materia',
      },
    },
    data_chamada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    presenca: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    justificativa: {
      type: DataTypes.TEXT,
    },
    horario_chamada: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    observacoes: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'chamada',
    timestamps: true,
  }
);

export default RollCall;
