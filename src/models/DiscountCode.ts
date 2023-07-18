import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";
import Sale from "./Sale";

interface DiscountCode
  extends Model<
    InferAttributes<DiscountCode>,
    InferCreationAttributes<DiscountCode>
  > {
  discountcodeid: CreationOptional<number>;
  discountcode: string;
  discountpercent: number;
  startdate: Date;
  finishdate: Date;
  accessrole: string;
  status: CreationOptional<boolean>;
  timecreated: CreationOptional<Date>;
  userid: number;
  isactive: CreationOptional<boolean>;
}

const DiscountCode = sequelize.define<DiscountCode>(
  "discount_code",
  {
    discountcodeid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    discountcode: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    discountpercent: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    startdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    finishdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accessrole: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    timecreated: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

DiscountCode.hasOne(Sale, {
  foreignKey: "discountcodeid",
  sourceKey: "discountcodeid",
  as: "discounts_sale",
});

Sale.belongsTo(DiscountCode, {
  foreignKey: "discountcodeid",
  as: "discount_sale",
});

export default DiscountCode;
