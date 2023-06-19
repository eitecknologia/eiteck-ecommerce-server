import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../database/config';
import { productStatus } from '../common/constants';

interface OrderProducts extends Model<InferAttributes<OrderProducts>, InferCreationAttributes<OrderProducts>> {
    orderprodid: CreationOptional<number>;
    orderid: number;
    productid: number;
    status: string;
    amount: CreationOptional<number>;
    timecreated: CreationOptional<Date>;
}

const OrderProducts = sequelize.define<OrderProducts>('ecommerce_order_product', {
    orderprodid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null
    },
    productid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: productStatus.SOLICITADO
    },
    timecreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    timestamps: false
});



export default OrderProducts;