import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";
import ProductMedia from "./ProductMedia";
import UserCart from "./ShoppingCart";
import SaleProduct from "./SaleProducts";

interface ProductVariant
  extends Model<
    InferAttributes<ProductVariant>,
    InferCreationAttributes<ProductVariant>
  > {
  prodvarid: CreationOptional<number>;
  name: string;
  stock: number;
  productid: number;
  isactive: CreationOptional<boolean>;
  timecreated: CreationOptional<Date>;
}

const ProductVariant = sequelize.define<ProductVariant>(
  "products_variants",
  {
    prodvarid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    productid: {
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
ProductVariant.hasMany(SaleProduct, {
  foreignKey: "prodvarid",
  sourceKey: "prodvarid",
  as: "sale_products",
});

SaleProduct.belongsTo(ProductVariant, {
  foreignKey: "prodvarid",
  as: "sale_product",
});

/* Relation with productImages table */
ProductVariant.hasMany(ProductMedia, {
  foreignKey: "prodvarid",
  sourceKey: "prodvarid",
  as: "product_media",
});

ProductMedia.belongsTo(ProductVariant, {
  foreignKey: "prodvarid",
  as: "product_media",
});

/* Relation with UserCart */
ProductVariant.hasMany(UserCart, {
  foreignKey: "prodvarid",
  sourceKey: "prodvarid",
  as: "cart_products",
});

UserCart.belongsTo(ProductVariant, {
  foreignKey: "prodvarid",
  as: "cart_product",
});

export default ProductVariant;
