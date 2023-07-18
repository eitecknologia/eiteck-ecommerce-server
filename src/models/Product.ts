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
  foreignKey: "productid",
  sourceKey: "id",
  as: "sale_products",
});

SaleProduct.belongsTo(Product, {
  foreignKey: "productid",
  as: "sale_product",
});

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

/* Relation with productImages table */
Product.hasMany(ProductImages, {
  foreignKey: "productid",
  sourceKey: "id",
  as: "product_resources",
});

ProductImages.belongsTo(Product, {
  foreignKey: "productid",
  as: "product_resource",
});

/* Relation with UserCart */
Product.hasMany(UserCart, {
  foreignKey: "productid",
  sourceKey: "id",
  as: "cart_products",
});

UserCart.belongsTo(Product, {
  foreignKey: "productid",
  as: "cart_product",
});

export default Product;
