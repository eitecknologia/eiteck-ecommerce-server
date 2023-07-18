import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";
import CategorySubcategory from "./CategorySubcategory";

interface Category
  extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  id: CreationOptional<number>;
  name: string;
  description: CreationOptional<string>;
  isactive: CreationOptional<boolean>;
  timecreated: CreationOptional<Date>;
}

const Category = sequelize.define<Category>(
  "categories",
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

/* Relation with Products one to many */
Category.hasMany(CategorySubcategory, {
  foreignKey: "categoryid",
  sourceKey: "id",
  as: "subcategories",
});

CategorySubcategory.belongsTo(Category, {
  foreignKey: "id",
  as: "subcategory",
});

export default Category;
