"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.initializeUser = initializeUser;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    // Méthode pour vérifier le mot de passe
    async comparePassword(candidatePassword) {
        return bcrypt_1.default.compare(candidatePassword, this.password);
    }
    // Méthode pour obtenir les données utilisateur sans le mot de passe
    toSafeObject() {
        const { password, verificationToken, ...safeUser } = this.toJSON();
        return safeUser;
    }
}
exports.User = User;
function initializeUser(sequelizeInstance) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100],
            },
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100],
            },
        },
        email: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        password: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [6, 255],
            },
        },
        role: {
            type: sequelize_1.DataTypes.ENUM('admin', 'manager', 'employee', 'guest'), // Updated ENUM
            allowNull: false,
            defaultValue: 'employee',
        },
        department: {
            type: sequelize_1.DataTypes.ENUM('hr', 'finance', 'it', 'operations', 'other'), // Added department
            allowNull: true,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: true,
        },
        address: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        city: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        },
        zipCode: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: true,
        },
        country: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        isVerified: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        verificationToken: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: true,
        },
    }, {
        sequelize: sequelizeInstance,
        tableName: 'users',
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const saltRounds = 12;
                    user.password = await bcrypt_1.default.hash(user.password, saltRounds);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const saltRounds = 12;
                    user.password = await bcrypt_1.default.hash(user.password, saltRounds);
                }
            },
        },
    });
}
