import { DataTypes, Model, Sequelize } from 'sequelize';

export interface InventoryItemAttributes {
  id?: number;
  name: string;
  reference: string;
  category: string;
  description?: string;
  quantity: number;
  alertThreshold: number;
  supplier?: string;
  location?: string;
}

class InventoryItem extends Model<InventoryItemAttributes> implements InventoryItemAttributes {
  public id!: number;
  public name!: string;
  public reference!: string;
  public category!: string;
  public description!: string;
  public quantity!: number;
  public alertThreshold!: number;
  public supplier!: string;
  public location!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize): typeof InventoryItem {
    InventoryItem.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 255],
          },
        },
        reference: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: [1, 50],
          },
        },
        category: {
          type: DataTypes.ENUM('Fournitures de bureau', 'Matériel informatique', 'Mobilier', 'Entretien', 'Autre'),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          validate: {
            min: 0,
          },
        },
        alertThreshold: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 5,
          field: 'alert_threshold',
          validate: {
            min: 0,
          },
        },
        supplier: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'InventoryItem',
        tableName: 'inventory_items',
        timestamps: true,
        underscored: true,
      }
    );
    return InventoryItem;
  }
}

export default InventoryItem;