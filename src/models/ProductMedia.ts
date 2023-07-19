import {
  DataTypes,
  InferAttributes,
  Model,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";

interface ProductMedia
  extends Model<
    InferAttributes<ProductMedia>,
    InferCreationAttributes<ProductMedia>
  > {
  prodmediaid: CreationOptional<number>;
  url: string;
  type: string;
  prodvarid: number;
  timecreated: CreationOptional<Date>;
}

// Define an Enum for the type of image
enum ImageType {
  IMAGE = "image",
  VIDEO = "video",
}

const ProductMedia = sequelize.define<ProductMedia>(
  "product_media",
  {
    prodmediaid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(ImageType)),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prodvarid: {
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

export default ProductMedia;
