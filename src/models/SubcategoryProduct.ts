import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";

interface SubcategoryProducts
  extends Model<
    InferAttributes<SubcategoryProducts>,
    InferCreationAttributes<SubcategoryProducts>
  > {
    id: CreationOptional<number>;
  subcategoryid: number;
  productid: number;
  createdAt: CreationOptional<Date>;
}

const SubcategoryProducts = sequelize.define<SubcategoryProducts>(
  "subcategories_products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subcategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productid: {
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

export default SubcategoryProducts;
