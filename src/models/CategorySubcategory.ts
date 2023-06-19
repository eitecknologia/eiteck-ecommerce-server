import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../database/config';

interface CategorySubcategory extends Model<InferAttributes<CategorySubcategory>, InferCreationAttributes<CategorySubcategory>> {
    casubid: CreationOptional<number>;
    categoryid: number;
    subcategoryid: number;
    timecreated: CreationOptional<Date>;
}

const CategorySubcategory = sequelize.define<CategorySubcategory>('ecommerce_categories_subcategories', {
    casubid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subcategoryid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timecreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    timestamps: false
});

export default CategorySubcategory;