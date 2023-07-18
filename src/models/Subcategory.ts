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
  timecreated: CreationOptional<Date>;
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

/* Relation with CategorySubcategory table */
Subcategory.hasMany(CategorySubcategory, {
  foreignKey: "id",
  sourceKey: "subcategoryid",
  as: "subcategories_category",
});

CategorySubcategory.belongsTo(Subcategory, {
  foreignKey: "id",
  as: "subcategory_category",
});

/* Relation with SucbategoryProduct table */
Subcategory.hasMany(SubcategoryProducts, {
  foreignKey: "id",
  sourceKey: "subcategoryid",
  as: "subcategories_products",
});

SubcategoryProducts.belongsTo(Subcategory, {
  foreignKey: "id",
  as: "subcategory_products",
});

export default Subcategory;
