const { Model, DataTypes } = require("sequelize");
const { CATEGORY_TABLE } = require("./category.model")

const PRODUCT_TABLE = "products";

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
    defaultValue: 'no description'
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'category_id',
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: DataTypes.NOW
  }
}

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'id',
      as: 'category' });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false
    }
  }
}

module.exports = {
  PRODUCT_TABLE,
  ProductSchema,
  Product
}
