import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Grade = sequelize.define(
  'notas',
  {
    id_nota: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_materia: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'materias',
        key: 'id_materia',
      },
    },
    id_aluno: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'alunos',
        key: 'id_aluno',
      },
    },
    nota: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    data_avaliacao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'notas',
    timestamps: false,
  }
);

export default Grade;
