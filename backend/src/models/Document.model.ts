import { DataTypes, Model, Sequelize } from 'sequelize';

export interface DocumentAttributes {
  id?: number;
  title: string;
  description?: string;
  type: string;
  filename: string;
  filepath: string;
  filesize: number;
  mimetype: string;
  authorId: number; // Garder authorId ici, la référence sera faite dans associations.ts
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

  public static initialize(sequelize: Sequelize): typeof Document {
    Document.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 255],
          },
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        type: {
          type: DataTypes.ENUM('Contrat', 'Procédure', 'Règlement', 'Rapport', 'Annonce', 'Autre'),
          allowNull: false,
        },
        filename: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'filename',
        },
        filepath: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'filepath',
        },
        filesize: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'filesize',
        },
        mimetype: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'mimetype',
        },
        authorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'author_id',
          // La référence à User sera gérée dans associations.ts
        },
        isPublic: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          field: 'is_public',
        },
      },
      {
        sequelize,
        modelName: 'Document',
        tableName: 'documents',
        timestamps: true,
        underscored: true,
      }
    );
    return Document;
  }
}

export default Document;
