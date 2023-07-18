import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";

interface CategorySubcategory
  extends Model<
    InferAttributes<CategorySubcategory>,
    InferCreationAttributes<CategorySubcategory>
  > {
  id: CreationOptional<number>;
  categoryid: number;
  subcategoryid: number;
  createdAt: CreationOptional<Date>;
}

const CategorySubcategory = sequelize.define<CategorySubcategory>(
  "categories_subcategories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subcategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

export default CategorySubcategory;
