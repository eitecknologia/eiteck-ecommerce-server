import {
  DataTypes,
  InferAttributes,
  Model,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";

interface BannerImages
  extends Model<
    InferAttributes<BannerImages>,
    InferCreationAttributes<BannerImages>
  > {
  bannerid: CreationOptional<number>;
  url: string;
  timecreated: CreationOptional<Date>;
}

const BannerImages = sequelize.define<BannerImages>(
  "banner_images",
  {
    bannerid: {
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

export default BannerImages;
