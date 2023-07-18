import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";

interface ShoppingCart
  extends Model<
    InferAttributes<ShoppingCart>,
    InferCreationAttributes<ShoppingCart>
  > {
  id: CreationOptional<number>;
  userid: number;
  productVariantId: number;
  quantity: number;
  createdAt: CreationOptional<Date>;
}

const ShoppingCart = sequelize.define<ShoppingCart>(
  "shopping_cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
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
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

export default ShoppingCart;
