const { Model, DataTypes } = require("sequelize");

const { CUSTOMER_TABLE } = require("./customer.model");

const ORDER_TABLE = 'orders';

const OrderSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	customerId: {
		field: 'customer_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		References: {
			model: CUSTOMER_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
  total: {
    type: DataTypes.VIRTUAL,
    //Do this only if you know that there's not gonna be to many items by order
    //If so, it is better to do a SQL query to the database
    get(){
      if(this.items.length > 0){
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        }, 0);
      }
    }
  },
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: DataTypes.NOW,
	},
};

class Order extends Model {
	static associate(models) {
		this.belongsTo(models.Customer, {
      foreignKey: 'customerId',
			as: 'customer',
		});

    this.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
      as: 'items'
    });
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_TABLE,
			modelName: 'Order',
			timestamps: false,
		};
	}
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
