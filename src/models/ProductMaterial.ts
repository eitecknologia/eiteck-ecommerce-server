import {
  DataTypes,
  InferAttributes,
  Model,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";

interface ProductMaterial
  extends Model<
    InferAttributes<ProductMaterial>,
    InferCreationAttributes<ProductMaterial>
  > {
  prodmatid: CreationOptional<number>;
  productid: number;
  name: string;
  timecreated: CreationOptional<Date>;
}

const ProductMaterial = sequelize.define<ProductMaterial>(
  "product_materials",
  {
    prodmatid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
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

export default ProductMaterial;
