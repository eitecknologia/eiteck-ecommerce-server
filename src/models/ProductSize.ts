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
  name: string;
  unit: string;
  productId: number;
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
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    productId: {
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

export default ProductSizes;
