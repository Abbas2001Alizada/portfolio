import sequelize from "../dbConnection.js";
import { DataTypes } from "sequelize";

 const User = sequelize.define('user', {
    // Define attributes (columns)

    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:true
    }, password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }, token: {
        type: DataTypes.STRING,
        allowNull: true
    },  resetPasswordExpires: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
});
export default User