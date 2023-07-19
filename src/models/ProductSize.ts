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
  prodsizeid: CreationOptional<number>;
  name: string;
  unit: string;
  productid: number;
  timecreated: CreationOptional<Date>;
}

const ProductSizes = sequelize.define<ProductSizes>(
  "product_sizes",
  {
    prodsizeid: {
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
    productid: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

export default ProductSizes;
