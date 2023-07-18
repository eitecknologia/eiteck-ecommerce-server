import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";
import SubcategoryProducts from "./SubcategoryProduct";
import ProductSizes from "./ProductSize";

interface Product
  extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  id: CreationOptional<number>;
  name: string;
  description: string;
  price: number;
  createdAt: CreationOptional<Date>;
  isActive: CreationOptional<boolean>;
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
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
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
  foreignKey: "productId",
  sourceKey: "id",
  as: "products_subcategories",
});

SubcategoryProducts.belongsTo(Product, {
  foreignKey: "productId",
  as: "product_subcategory",
});

/* Relation with ProductSizes */
Product.hasMany(ProductSizes, {
  foreignKey: "productId",
  sourceKey: "id",
  as: "product_sizes",
});

ProductSizes.belongsTo(Product, {
  foreignKey: "productId",
  as: "product_size",
});

export default Product;
