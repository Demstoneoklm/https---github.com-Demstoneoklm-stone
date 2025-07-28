"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class InventoryItem extends sequelize_1.Model {
}
InventoryItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    reference: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, 50]
        }
    },
    category: {
        type: sequelize_1.DataTypes.ENUM('Fournitures de bureau', 'Matériel informatique', 'Mobilier', 'Entretien', 'Autre'),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    alertThreshold: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
        field: 'alert_threshold',
        validate: {
            min: 0
        }
    },
    supplier: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'InventoryItem',
    tableName: 'inventory_items',
    timestamps: true,
    underscored: true
});
exports.default = InventoryItem;
