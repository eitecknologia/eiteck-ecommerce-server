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
    cartid: CreationOptional<number>;
  userid: number;
  productVariantId: number;
  quantity: number;
  timecreated: CreationOptional<Date>;
}

const ShoppingCart = sequelize.define<ShoppingCart>(
  "shopping_cart",
  {
    cartid: {
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
    timecreated: {
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
