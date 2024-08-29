import sequelize from "../dbConnection.js";
import { DataTypes } from "sequelize";

export const Project = sequelize.define('project', {
    // Define attributes (columns)

    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:true
    }, description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    githubUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }, imagePath: {
        type: DataTypes.STRING,
        allowNull: true,
    }, view: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});