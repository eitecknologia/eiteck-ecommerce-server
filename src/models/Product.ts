import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";
import ProductImages from "./ProductImage";
import SubcategoryProducts from "./SubcategoryProduct";
import UserCart from "./Shoppingcart";
import SaleProduct from "./SaleProducts";

interface Product
  extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    id: CreationOptional<number>;
  name: string;
  description: string;
  price: number;
  stock: CreationOptional<number>;
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
      allowNull: true,
      defaultValue: null,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

/* Relation with sale products */
Product.hasMany(SaleProduct, {
  foreignKey: "id",
  sourceKey: "productid",
  as: "sale_products",
});

SaleProduct.belongsTo(Product, {
  foreignKey: "id",
  as: "sale_product",
});

/* Relation with SubcategoryProduct table */
Product.hasMany(SubcategoryProducts, {
  foreignKey: "id",
  sourceKey: "productid",
  as: "products_subcategories",
});

SubcategoryProducts.belongsTo(Product, {
  foreignKey: "id",
  as: "product_subcategory",
});

/* Relation with productImages table */
Product.hasMany(ProductImages, {
  foreignKey: "id",
  sourceKey: "productid",
  as: "product_resources",
});

ProductImages.belongsTo(Product, {
  foreignKey: "id",
  as: "product_resource",
});

/* Relation with UserCart */
Product.hasMany(UserCart, {
  foreignKey: "id",
  sourceKey: "productid",
  as: "cart_products",
});

UserCart.belongsTo(Product, {
  foreignKey: "id",
  as: "cart_product",
});

export default Product;
