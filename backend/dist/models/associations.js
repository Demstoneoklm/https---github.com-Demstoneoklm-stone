"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = require("./User.model");
const Document_model_1 = require("./Document.model");
const UserRequest_model_1 = require("./UserRequest.model");
const setupAssociations = () => {
    // User - Document (One-to-Many)
    User_model_1.User.hasMany(Document_model_1.Document, { foreignKey: 'authorId', as: 'documents' });
    Document_model_1.Document.belongsTo(User_model_1.User, { foreignKey: 'authorId', as: 'author' });
    // User - UserRequest (One-to-Many)
    User_model_1.User.hasMany(UserRequest_model_1.UserRequest, { foreignKey: 'userId', as: 'requests' });
    UserRequest_model_1.UserRequest.belongsTo(User_model_1.User, { foreignKey: 'userId', as: 'user' });
    // User - UserRequest (One-to-Many for responder)
    User_model_1.User.hasMany(UserRequest_model_1.UserRequest, { foreignKey: 'responseBy', as: 'responses' });
    UserRequest_model_1.UserRequest.belongsTo(User_model_1.User, { foreignKey: 'responseBy', as: 'responder' });
};
exports.default = setupAssociations;
