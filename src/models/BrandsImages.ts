import {
  DataTypes,
  InferAttributes,
  Model,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";

interface BrandsImages
  extends Model<
    InferAttributes<BrandsImages>,
    InferCreationAttributes<BrandsImages>
  > {
  id: CreationOptional<number>;
  url: string;
  timecreated: CreationOptional<Date>;
}

const BrandsImages = sequelize.define<BrandsImages>(
  "brands_images",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
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

export default BrandsImages;
