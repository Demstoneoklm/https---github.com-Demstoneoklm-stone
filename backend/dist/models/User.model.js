"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.initializeUser = initializeUser;
const sequelize_1 = require("sequelize");
const bcrypt = __importStar(require("bcrypt"));
class User extends sequelize_1.Model {
    // Méthode pour vérifier le mot de passe
    async comparePassword(candidatePassword) {
        return bcrypt.compare(candidatePassword, this.password);
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
            type: sequelize_1.DataTypes.ENUM('admin', 'manager', 'employee', 'guest', 'user'), // AJOUT DE 'user' ICI
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
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false, // Should be NOT NULL for createdAt
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false, // Should be NOT NULL for updatedAt
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize: sequelizeInstance,
        tableName: 'users',
        timestamps: false, // Set to false to manually manage timestamps
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const saltRounds = 12;
                    user.password = await bcrypt.hash(user.password, saltRounds);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const saltRounds = 12;
                    user.password = await bcrypt.hash(user.password, saltRounds);
                }
            },
        },
    });
}
