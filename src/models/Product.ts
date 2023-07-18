import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";
import SubcategoryProducts from "./SubcategoryProduct";

interface Product
  extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  id: CreationOptional<number>;
  name: string;
  description: string;
  price: number;
  timecreated: CreationOptional<Date>;
  isactive: CreationOptional<boolean>;
}

const Product = sequelize.define<Product>(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    timecreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

/* Relation with SubcategoryProduct table */
Product.hasMany(SubcategoryProducts, {
  foreignKey: "productid",
  sourceKey: "id",
  as: "products_subcategories",
});

SubcategoryProducts.belongsTo(Product, {
  foreignKey: "productid",
  as: "product_subcategory",
});

export default Product;
