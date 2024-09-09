// models/Resume.js
import { DataTypes } from 'sequelize';
import sequelize from '../dbConnection.js'; // Sequelize instance

export const Resume = sequelize.define('Resume', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filepath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
