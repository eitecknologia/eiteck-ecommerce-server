import {
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";
import UserCart from "./Shoppingcart";
import ShoppingCart from "./Shoppingcart";
import InvoiceDetail from "./InvoiceDetails";
import DiscountCode from "./DiscountCode";

interface User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: CreationOptional<number>;
  name: string;
  lastname: string;
  ci: string;
  address: string;
  email: string;
  password: string;
  phone: CreationOptional<string>;
  google: CreationOptional<boolean>;
  facebook: CreationOptional<boolean>;
  isactive: CreationOptional<boolean | null>;
  timecreated: CreationOptional<Date>;
  roleid: number;
}

const User = sequelize.define<User>(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ci: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
    google: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    facebook: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    timecreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    roleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: process.env.USER_ID,
    },
  },
  {
    timestamps: false,
  }
);

/* Relation with UserCart */
User.hasMany(UserCart, {
  foreignKey: "userid",
  sourceKey: "userid",
});

UserCart.belongsTo(User, {
  foreignKey: "userid",
});

/* Relation with shopping cart */
User.hasMany(ShoppingCart, {
  foreignKey: "userid",
  sourceKey: "userid",
  as: "usercart_products",
});

ShoppingCart.belongsTo(User, {
  foreignKey: "userid",
  as: "usercart_product",
});

/* Relation with invoice detail */
User.hasMany(InvoiceDetail, {
  foreignKey: "userid",
  sourceKey: "userid",
  as: "invoice_user_details",
});

InvoiceDetail.belongsTo(User, {
  foreignKey: "userid",
  as: "invoice_user_detail",
});

/* Relation with discount code */
User.hasMany(DiscountCode, {
  foreignKey: "userid",
  sourceKey: "userid",
  as: "authors_discounts",
});

DiscountCode.belongsTo(User, {
  foreignKey: "userid",
  as: "author_discount",
});

export default User;
