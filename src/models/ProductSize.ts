import {
  DataTypes,
  InferAttributes,
  Model,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";

interface ProductSizes
  extends Model<
    InferAttributes<ProductSizes>,
    InferCreationAttributes<ProductSizes>
  > {
  id: CreationOptional<number>;
  productid: number;
  name: string;
  unit: string;
  createdAt: CreationOptional<Date>;
}

const ProductSizes = sequelize.define<ProductSizes>(
  "product_sizes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(),
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

export default ProductSizes;
