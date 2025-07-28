"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("./User.model"));
const Document_model_1 = __importDefault(require("./Document.model"));
const UserRequest_model_1 = __importDefault(require("./UserRequest.model"));
const setupAssociations = () => {
    // User - Document (One-to-Many)
    User_model_1.default.hasMany(Document_model_1.default, { foreignKey: 'authorId', as: 'documents' });
    Document_model_1.default.belongsTo(User_model_1.default, { foreignKey: 'authorId', as: 'author' });
    // User - UserRequest (One-to-Many)
    User_model_1.default.hasMany(UserRequest_model_1.default, { foreignKey: 'userId', as: 'requests' });
    UserRequest_model_1.default.belongsTo(User_model_1.default, { foreignKey: 'userId', as: 'user' });
    // User - UserRequest (One-to-Many for responder)
    User_model_1.default.hasMany(UserRequest_model_1.default, { foreignKey: 'responseBy', as: 'responses' });
    UserRequest_model_1.default.belongsTo(User_model_1.default, { foreignKey: 'responseBy', as: 'responder' });
};
exports.default = setupAssociations;
