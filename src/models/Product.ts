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
import ProductMaterial from "./ProductMaterial";

interface Product
  extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  productid: CreationOptional<number>;
  name: string;
  description: string;
  price: number;
  timecreated: CreationOptional<Date>;
  isactive: CreationOptional<boolean>;
}

const Product = sequelize.define<Product>(
  "products",
  {
    productid: {
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
  foreignKey: "productId",
  sourceKey: "productId",
  as: "products_subcategories",
});

SubcategoryProducts.belongsTo(Product, {
  foreignKey: "productId",
  as: "product_subcategory",
});

/* Relation with ProductSizes */
Product.hasMany(ProductSizes, {
  foreignKey: "productId",
  sourceKey: "productId",
  as: "product_sizes",
});

ProductSizes.belongsTo(Product, {
  foreignKey: "productId",
  as: "product_size",
});

/* Relation with ProductMaterial */
Product.hasMany(ProductMaterial, {
  foreignKey: "productId",
  sourceKey: "productId",
  as: "product_materials",
});

ProductMaterial.belongsTo(Product, {
  foreignKey: "productId",
  as: "product_material",
});

export default Product;
