const sequelize = require('../config/db.js')
const {
    DataTypes
} = require('sequelize');

const AccountModel = require('./Account.js');
const CustomerModel = require('./Customer.js');
const DistributeInformationModel = require('./DistributeInformation.js');
const FactoryModel = require('./Factory.js');
const GuaranteeModel = require('./Guarantee.js');
const OrderModel = require('./Order.js');
const ProductModel = require('./Product.js');
const ProductLineModel = require('./ProductLine.js');
const StoreModel = require('./Store.js');
const WarrantyInformationModel = require('./WarrantyInformation.js');

const Account = AccountModel(sequelize, DataTypes);
const Customer = CustomerModel(sequelize, DataTypes);
const DistributeInformation = DistributeInformationModel(sequelize, DataTypes);
const Factory = FactoryModel(sequelize, DataTypes);
const Guarantee = GuaranteeModel(sequelize, DataTypes);
const Order = OrderModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);
const ProductLine = ProductLineModel(sequelize, DataTypes);
const Store = StoreModel(sequelize, DataTypes);
const WarrantyInformation = WarrantyInformationModel(sequelize, DataTypes);

// Distribute Information association
Product.hasOne(DistributeInformation, {
    foreignKey: 'product_id',
    allowNull: false,
})

Store.hasMany(DistributeInformation, {
    foreignKey: 'store_id',
    allowNull: false,
})

DistributeInformation.belongsTo(Product, {
    foreignKey: 'product_id'
})

DistributeInformation.belongsTo(Store, {
    foreignKey: 'store_id'
})

// Factory association
Factory.belongsToMany(Store, {
    through: 'store_factory',
})

Store.belongsToMany(Factory, {
    through: 'store_factory',
})

Factory.belongsTo(Account), {
    foreignKey: 'account_id',
    allowNull: false,
};

// Guarantee association
Guarantee.belongsToMany(Store, {
    through: 'store_guarantee',
})

Store.belongsToMany(Guarantee, {
    through: 'store_guarantee',
})

Guarantee.belongsTo(Account), {
    foreignKey: 'account_id',
    allowNull: false,
};

// Order association
Customer.hasMany(Order, {
    foreignKey: 'customer_id',
    allowNull: false,
    // onDelete: 'CASCADE',
})

Store.hasMany(Order, {
    foreignKey: 'store_id',
    allowNull: false,
    // onDelete: 'CASCADE',
})

Product.hasOne(Order, {
    foreignKey: 'product_id',
    allowNull: false,
    // onDelete: 'CASCADE',
})

Order.belongsTo(Customer, {
    foreignKey: 'customer_id'
})

Order.belongsTo(Store, {
    foreignKey: 'store_id'
})

Order.belongsTo(Product, {
    foreignKey: 'product_id'
})

// Product association
Factory.hasMany(Product, {
    foreignKey: 'factory_id',
    allowNull: false,
})

ProductLine.hasMany(Product, {
    foreignKey: 'product_line_id',
    allowNull: false,
})

Product.belongsTo(ProductLine, {
    foreignKey: 'factory_id',
    allowNull: false,
})

Product.belongsTo(Factory, {
    foreignKey: 'factory_id',
    allowNull: false,
})

// Store association
Store.belongsTo(Account), {
    foreignKey: 'account_id',
    allowNull: false,
};

//  Warranty Information association
Product.hasMany(WarrantyInformation, {
    foreignKey: 'product_id',
})

Guarantee.hasMany(WarrantyInformation, {
    foreignKey: 'guarantee_id',
})

Customer.hasMany(WarrantyInformation, {
    foreignKey: 'customer_id',
})

WarrantyInformation.belongsTo(Product, {
    foreignKey: 'product_id',
})

WarrantyInformation.belongsTo(Guarantee, {
    foreignKey: 'guarantee_id',

})

WarrantyInformation.belongsTo(Customer, {
    foreignKey: 'customer_id',
})

module.exports = {
    Account,
    Customer,
    DistributeInformation,
    Factory,
    Guarantee,
    Order,
    Product,
    ProductLine,
    Store,
    WarrantyInformation,
}