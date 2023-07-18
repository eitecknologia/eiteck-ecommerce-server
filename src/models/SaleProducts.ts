import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";

interface SaleProduct
  extends Model<
    InferAttributes<SaleProduct>,
    InferCreationAttributes<SaleProduct>
  > {
  id: CreationOptional<number>;
  saleid: number;
  productVariantId: number;
  quantity: number;
  createdAt: CreationOptional<Date>;
}

const SaleProduct = sequelize.define<SaleProduct>(
  "sale_product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    saleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productVariantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
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

export default SaleProduct;
