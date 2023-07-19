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
  id: CreationOptional<number>;
  name: string;
  stock: number;
  productId: number;
  isActive: CreationOptional<boolean>;
  createdAt: CreationOptional<Date>;
}

const ProductVariant = sequelize.define<ProductVariant>(
  "products_variants",
  {
    id: {
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
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

/* Relation with sale products */
ProductVariant.hasMany(SaleProduct, {
  foreignKey: "productVariantId",
  sourceKey: "id",
  as: "sale_products",
});

SaleProduct.belongsTo(ProductVariant, {
  foreignKey: "productVariantId",
  as: "sale_product",
});

/* Relation with productImages table */
ProductVariant.hasMany(ProductMedia, {
  foreignKey: "productVariantId",
  sourceKey: "id",
  as: "product_media",
});

ProductMedia.belongsTo(ProductVariant, {
  foreignKey: "productVariantId",
  as: "product_media",
});

/* Relation with UserCart */
ProductVariant.hasMany(UserCart, {
  foreignKey: "productVariantId",
  sourceKey: "id",
  as: "cart_products",
});

UserCart.belongsTo(ProductVariant, {
  foreignKey: "productVariantId",
  as: "cart_product",
});

export default ProductVariant;
