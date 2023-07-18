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
  id: CreationOptional<number>;
  url: string;
  type: string;
  default: boolean;
  productVariantId: number;
  createdAt: CreationOptional<Date>;
}

// Define an Enum for the type of image
enum ImageType {
  IMAGE = "image",
  VIDEO = "video",
}

const ProductMedia = sequelize.define<ProductMedia>(
  "product_media",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(ImageType)),
      allowNull: false,
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productVariantId: {
      type: DataTypes.INTEGER,
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

export default ProductMedia;
