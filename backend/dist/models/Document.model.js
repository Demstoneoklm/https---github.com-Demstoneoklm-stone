"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const sequelize_1 = require("sequelize");
class Document extends sequelize_1.Model {
    static initialize(sequelize) {
        Document.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 255],
                },
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            type: {
                type: sequelize_1.DataTypes.ENUM('Contrat', 'Procédure', 'Règlement', 'Rapport', 'Annonce', 'Autre'),
                allowNull: false,
            },
            filename: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                field: 'filename',
            },
            filepath: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                field: 'filepath',
            },
            filesize: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                field: 'filesize',
            },
            mimetype: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                field: 'mimetype',
            },
            authorId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                field: 'author_id',
                // La référence à User sera gérée dans associations.ts
            },
            isPublic: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: true,
                field: 'is_public',
            },
        }, {
            sequelize,
            modelName: 'Document',
            tableName: 'documents',
            timestamps: true,
            underscored: true,
        });
        return Document;
    }
}
exports.Document = Document;
