"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.initializeUser = initializeUser;
var sequelize_1 = require("sequelize");
var bcrypt = require("bcrypt");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Méthode pour vérifier le mot de passe
    User.prototype.comparePassword = function (candidatePassword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bcrypt.compare(candidatePassword, this.password)];
            });
        });
    };
    // Méthode pour obtenir les données utilisateur sans le mot de passe
    User.prototype.toSafeObject = function () {
        var _a = this.toJSON(), password = _a.password, verificationToken = _a.verificationToken, safeUser = __rest(_a, ["password", "verificationToken"]);
        return safeUser;
    };
    return User;
}(sequelize_1.Model));
exports.User = User;
function initializeUser(sequelizeInstance) {
    var _this = this;
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
            beforeCreate: function (user) { return __awaiter(_this, void 0, void 0, function () {
                var saltRounds, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!user.password) return [3 /*break*/, 2];
                            saltRounds = 12;
                            _a = user;
                            return [4 /*yield*/, bcrypt.hash(user.password, saltRounds)];
                        case 1:
                            _a.password = _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); },
            beforeUpdate: function (user) { return __awaiter(_this, void 0, void 0, function () {
                var saltRounds, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!user.changed('password')) return [3 /*break*/, 2];
                            saltRounds = 12;
                            _a = user;
                            return [4 /*yield*/, bcrypt.hash(user.password, saltRounds)];
                        case 1:
                            _a.password = _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); },
        },
    });
}
