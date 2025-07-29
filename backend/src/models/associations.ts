
import { User } from './User.model';
import { Document } from './Document.model';
import { UserRequest } from './UserRequest.model';

const setupAssociations = () => {
    // User - Document (One-to-Many)
    User.hasMany(Document, { foreignKey: 'authorId', as: 'documents' });
    Document.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

    // User - UserRequest (One-to-Many)
    User.hasMany(UserRequest, { foreignKey: 'userId', as: 'requests' });
    UserRequest.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    // User - UserRequest (One-to-Many for responder)
    User.hasMany(UserRequest, { foreignKey: 'responseBy', as: 'responses' });
    UserRequest.belongsTo(User, { foreignKey: 'responseBy', as: 'responder' });
};

export default setupAssociations;
