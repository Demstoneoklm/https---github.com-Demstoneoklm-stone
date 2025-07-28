"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 255]
        }
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'first_name',
        validate: {
            len: [1, 50]
        }
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'last_name',
        validate: {
            len: [1, 50]
        }
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'manager', 'employee', 'guest'),
        allowNull: false,
        defaultValue: 'employee'
    },
    department: {
        type: sequelize_1.DataTypes.ENUM('hr', 'finance', 'it', 'operations', 'other'),
        allowNull: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_verified'
    },
    verificationToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'verification_token'
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true
});
exports.default = User;
