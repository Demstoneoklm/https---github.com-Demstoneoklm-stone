
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User.model';

interface DocumentAttributes {
    id?: number;
    title: string;
    description?: string;
    type: string;
    filename: string;
    filepath: string;
    filesize: number;
    mimetype: string;
    authorId: number;
    isPublic?: boolean;
}

class Document extends Model<DocumentAttributes> implements DocumentAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public type!: string;
    public filename!: string;
    public filepath!: string;
    public filesize!: number;
    public mimetype!: string;
    public authorId!: number;
    public isPublic!: boolean;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Document.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('Contrat', 'Procédure', 'Règlement', 'Rapport', 'Annonce', 'Autre'),
        allowNull: false
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'filename'
    },
    filepath: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'filepath'
    },
    filesize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'filesize'
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'mimetype'
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'author_id',
        references: {
            model: User,
            key: 'id'
        }
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_public'
    }
}, {
    sequelize,
    modelName: 'Document',
    tableName: 'documents',
    timestamps: true,
    underscored: true
});

// Relations
Document.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Document, { foreignKey: 'authorId', as: 'documents' });

export default Document;
