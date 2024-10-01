import sequelize from "../dbConnection.js";
import { DataTypes } from "sequelize";

export const Message = sequelize.define('message', {
    // Define attributes (columns)

    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },message: {
        type: DataTypes.STRING,
        allowNull: true,
    },deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});