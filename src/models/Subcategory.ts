import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";
import CategorySubcategory from "./CategorySubcategory";
import SubcategoryProducts from "./SubcategoryProduct";

interface Subcategory
  extends Model<
    InferAttributes<Subcategory>,
    InferCreationAttributes<Subcategory>
  > {
    id: CreationOptional<number>;
  name: string;
  description: CreationOptional<string>;
  isactive: CreationOptional<boolean>;
  createdAt: CreationOptional<Date>;
}

const Subcategory = sequelize.define<Subcategory>(
  "subcategories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isactive: {
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

/* Relation with CategorySubcategory table */
Subcategory.hasMany(CategorySubcategory, {
  foreignKey: "subcategoryid",
  sourceKey: "id",
  as: "subcategories_category",
});

CategorySubcategory.belongsTo(Subcategory, {
  foreignKey: "subcategoryid",
  as: "subcategory_category",
});

/* Relation with SucbategoryProduct table */
Subcategory.hasMany(SubcategoryProducts, {
  foreignKey: "subcategoryid",
  sourceKey: "id",
  as: "subcategories_products",
});

SubcategoryProducts.belongsTo(Subcategory, {
  foreignKey: "subcategoryid",
  as: "subcategory_products",
});

export default Subcategory;
