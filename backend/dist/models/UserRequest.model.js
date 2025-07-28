"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_model_1 = __importDefault(require("./User.model"));
class UserRequest extends sequelize_1.Model {
}
UserRequest.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
            model: User_model_1.default,
            key: 'id'
        }
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('Congé', 'Matériel', 'Formation', 'Support', 'Autre'),
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
    },
    requestDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'request_date'
    },
    responseDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'response_date'
    },
    responseBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: 'response_by',
        references: {
            model: User_model_1.default,
            key: 'id'
        }
    },
    responseNote: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        field: 'response_note'
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'UserRequest',
    tableName: 'user_requests',
    timestamps: true,
    underscored: true
});
// Relations
UserRequest.belongsTo(User_model_1.default, { foreignKey: 'userId', as: 'user' });
UserRequest.belongsTo(User_model_1.default, { foreignKey: 'responseBy', as: 'responder' });
User_model_1.default.hasMany(UserRequest, { foreignKey: 'userId', as: 'requests' });
exports.default = UserRequest;
