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
  id: CreationOptional<number>;
  productVariantId: number;
  name: string;
  createdAt: CreationOptional<Date>;
}

const ProductMaterial = sequelize.define<ProductMaterial>(
  "product_materials",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productVariantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
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

export default ProductMaterial;
