import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttributes {
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
    department?: string;
    phone?: string;
    isVerified?: boolean;
    verificationToken?: string | null;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public role!: string;
    public department!: string;
    public phone!: string;
    public isVerified!: boolean;
    public verificationToken!: string | null;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 255]
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name',
        validate: {
            len: [1, 50]
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name',
        validate: {
            len: [1, 50]
        }
    },
    role: {
        type: DataTypes.ENUM('admin', 'manager', 'employee', 'guest'),
        allowNull: false,
        defaultValue: 'employee'
    },
    department: {
        type: DataTypes.ENUM('hr', 'finance', 'it', 'operations', 'other'),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_verified'
    },
    verificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'verification_token'
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true
});

export default User;