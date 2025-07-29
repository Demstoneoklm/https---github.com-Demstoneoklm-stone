import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import * as bcrypt from 'bcrypt';

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'manager' | 'employee' | 'guest'; // Added manager, employee, guest
  department?: 'hr' | 'finance' | 'it' | 'operations' | 'other'; // Added department
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  isActive: boolean;
  isVerified: boolean; // Added isVerified
  verificationToken?: string | null; // Added verificationToken
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'isActive' | 'isVerified' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'user' | 'manager' | 'employee' | 'guest';
  public department?: 'hr' | 'finance' | 'it' | 'operations' | 'other';
  public phone?: string;
  public address?: string;
  public city?: string;
  public zipCode?: string;
  public country?: string;
  public isActive!: boolean;
  public isVerified!: boolean;
  public verificationToken?: string | null;

  // Timestamps (manually defined now)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Méthode pour vérifier le mot de passe
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  // Méthode pour obtenir les données utilisateur sans le mot de passe
  public toSafeObject() {
    const { password, verificationToken, ...safeUser } = this.toJSON();
    return safeUser;
  }
}

export function initializeUser(sequelizeInstance: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 255],
        },
      },
      role: {
        type: DataTypes.ENUM('admin', 'manager', 'employee', 'guest'), // Updated ENUM
        allowNull: false,
        defaultValue: 'employee',
      },
      department: {
        type: DataTypes.ENUM('hr', 'finance', 'it', 'operations', 'other'), // Added department
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      zipCode: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      verificationToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false, // Should be NOT NULL for createdAt
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false, // Should be NOT NULL for updatedAt
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize: sequelizeInstance,
      tableName: 'users',
      timestamps: false, // Set to false to manually manage timestamps
      hooks: {
        beforeCreate: async (user: User) => {
          if (user.password) {
            const saltRounds = 12;
            user.password = await bcrypt.hash(user.password, saltRounds);
          }
        },
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            const saltRounds = 12;
            user.password = await bcrypt.hash(user.password, saltRounds);
          }
        },
      },
    }
  );
}
