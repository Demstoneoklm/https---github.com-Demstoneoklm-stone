"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_model_1 = __importDefault(require("./User.model"));
class Document extends sequelize_1.Model {
}
Document.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
        allowNull: true
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('Contrat', 'Procédure', 'Règlement', 'Rapport', 'Annonce', 'Autre'),
        allowNull: false
    },
    filename: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'filename'
    },
    filepath: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'filepath'
    },
    filesize: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'filesize'
    },
    mimetype: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'mimetype'
    },
    authorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'author_id',
        references: {
            model: User_model_1.default,
            key: 'id'
        }
    },
    isPublic: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_public'
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'Document',
    tableName: 'documents',
    timestamps: true,
    underscored: true
});
// Relations
Document.belongsTo(User_model_1.default, { foreignKey: 'authorId', as: 'author' });
User_model_1.default.hasMany(Document, { foreignKey: 'authorId', as: 'documents' });
exports.default = Document;
