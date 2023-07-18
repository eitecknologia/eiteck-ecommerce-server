import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";
import ProductImages from "./ProductImage";
import UserCart from "./Shoppingcart";
import SaleProduct from "./SaleProducts";
import ProductSizes from "./ProductSize";
import ProductMaterial from "./ProductMaterial";

interface ProductVariant
  extends Model<
    InferAttributes<ProductVariant>,
    InferCreationAttributes<ProductVariant>
  > {
  id: CreationOptional<number>;
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
ProductVariant.hasMany(ProductImages, {
  foreignKey: "productVariantId",
  sourceKey: "id",
  as: "product_media",
});

ProductImages.belongsTo(ProductVariant, {
  foreignKey: "productVariantId",
  as: "product_resource",
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

/* Relation with ProductSizes */
ProductVariant.hasMany(ProductSizes, {
  foreignKey: "productVariantId",
  sourceKey: "id",
  as: "product_sizes",
});

ProductSizes.belongsTo(ProductVariant, {
  foreignKey: "productVariantId",
  as: "product_size",
});

/* Relation with ProductMaterial */
ProductVariant.hasMany(ProductMaterial, {
  foreignKey: "productVariantId",
  sourceKey: "id",
  as: "product_materials",
});

ProductMaterial.belongsTo(ProductVariant, {
  foreignKey: "productVariantId",
  as: "product_material",
});

export default ProductVariant;
