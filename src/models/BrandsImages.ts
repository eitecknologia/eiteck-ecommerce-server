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
  brandid: CreationOptional<number>;
  name: string;
  url: string;
  timecreated: CreationOptional<Date>;
}

const BrandsImages = sequelize.define<BrandsImages>(
  "brands_images",
  {
    brandid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
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
