import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";
import Sale from "./Sale";

interface InvoiceDetail
  extends Model<
    InferAttributes<InvoiceDetail>,
    InferCreationAttributes<InvoiceDetail>
  > {
    id: CreationOptional<number>;
  ci: string;
  name: string;
  lastname: string;
  address: string;
  phone: string;
  email: string;
  remember: CreationOptional<boolean>;
  userid: number;
  timecreated: CreationOptional<Date>;
}

const InvoiceDetail = sequelize.define<InvoiceDetail>(
  "invoice_details",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ci: {
      type: DataTypes.STRING(15),
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
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    remember: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userid: {
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

/* Relation with invoice detail */
InvoiceDetail.hasMany(Sale, {
  foreignKey: "invoiceid",
  sourceKey: "id",
  as: "sales_user_detail",
});

Sale.belongsTo(InvoiceDetail, {
  foreignKey: "invoiceid",
  as: "sale_user_detail",
});

export default InvoiceDetail;
