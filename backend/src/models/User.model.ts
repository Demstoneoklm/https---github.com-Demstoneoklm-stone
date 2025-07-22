import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: true // Ajoute created_at/updated_at automatiquement
});

export default User;