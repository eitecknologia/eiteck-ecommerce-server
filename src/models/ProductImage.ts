import { DataTypes, InferAttributes, Model, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../database/config';

interface ProductImages extends Model<InferAttributes<ProductImages>, InferCreationAttributes<ProductImages>> {
    imageid: CreationOptional<number>;
    url: string;
    type: string;
    productid: number;
}

const ProductImages = sequelize.define<ProductImages>('ldc_product_resources', {
    imageid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

export default ProductImages;
