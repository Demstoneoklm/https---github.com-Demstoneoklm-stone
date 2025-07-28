"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class UserRequest extends sequelize_1.Model {
    static initialize(sequelize) {
        UserRequest.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id',
                // La référence à User sera gérée dans associations.ts
            },
            type: {
                type: sequelize_1.DataTypes.ENUM('Congé', 'Matériel', 'Formation', 'Support', 'Autre'),
                allowNull: false,
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
                allowNull: false,
            },
            status: {
                type: sequelize_1.DataTypes.ENUM('pending', 'approved', 'rejected'),
                allowNull: false,
                defaultValue: 'pending',
            },
            requestDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
                field: 'request_date',
            },
            responseDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                field: 'response_date',
            },
            responseBy: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                field: 'response_by',
                // La référence à User sera gérée dans associations.ts
            },
            responseNote: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                field: 'response_note',
            },
        }, {
            sequelize,
            modelName: 'UserRequest',
            tableName: 'user_requests',
            timestamps: true,
            underscored: true,
        });
        return UserRequest;
    }
}
exports.default = UserRequest;
