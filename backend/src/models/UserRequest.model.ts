import { DataTypes, Model, Sequelize } from 'sequelize';

export interface UserRequestAttributes {
  id?: number;
  userId: number;
  type: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: Date;
  responseDate?: Date;
  responseBy?: number;
  responseNote?: string;
}

class UserRequest extends Model<UserRequestAttributes> implements UserRequestAttributes {
  public id!: number;
  public userId!: number;
  public type!: string;
  public title!: string;
  public description!: string;
  public status!: 'pending' | 'approved' | 'rejected';
  public requestDate!: Date;
  public responseDate!: Date;
  public responseBy!: number;
  public responseNote!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize): typeof UserRequest {
    UserRequest.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'user_id',
          // La référence à User sera gérée dans associations.ts
        },
        type: {
          type: DataTypes.ENUM('Congé', 'Matériel', 'Formation', 'Support', 'Autre'),
          allowNull: false,
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
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('pending', 'approved', 'rejected'),
          allowNull: false,
          defaultValue: 'pending',
        },
        requestDate: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: 'request_date',
        },
        responseDate: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'response_date',
        },
        responseBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'response_by',
          // La référence à User sera gérée dans associations.ts
        },
        responseNote: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: 'response_note',
        },
      },
      {
        sequelize,
        modelName: 'UserRequest',
        tableName: 'user_requests',
        timestamps: true,
        underscored: true,
      }
    );
    return UserRequest;
  }
}

export { UserRequest };
