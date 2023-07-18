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
  productid: number;
  quantity: number;
  timecreated: CreationOptional<Date>;
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
    productid: {
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
