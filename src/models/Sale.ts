import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";
import SaleProduct from "./SaleProducts";

interface Sale
  extends Model<InferAttributes<Sale>, InferCreationAttributes<Sale>> {
  saleid: CreationOptional<number>;
  status: CreationOptional<string>;
  userid: number;
  invoiceid: number;
  discountcodeid: CreationOptional<number>;
  paymentresource: CreationOptional<string>;
  observation: CreationOptional<string>;
  saledate: CreationOptional<Date>;
  subtotal: number;
  iva: number;
  totalsale: number;
  timecreated: CreationOptional<Date>;
}

export enum SaleStatus {
  RESERVED = "RESERVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  PAID = "PAID",
}

const Sale = sequelize.define<Sale>(
  "sale",
  {
    saleid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalsale: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    iva: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(SaleStatus)),
      allowNull: false,
      defaultValue: SaleStatus.PENDING,
    },
    saledate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    paymentresource: {
      type: DataTypes.STRING(),
      allowNull: true,
      defaultValue: null,
    },
    observation: {
      type: DataTypes.STRING(),
      allowNull: true,
      defaultValue: null,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invoiceid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discountcodeid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
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

/* Relation with sale products */
Sale.hasMany(SaleProduct, {
  foreignKey: "saleid",
  sourceKey: "saleid",
  as: "products_sale",
});

SaleProduct.belongsTo(Sale, {
  foreignKey: "saleid",
  as: "product_sale",
});

export default Sale;
