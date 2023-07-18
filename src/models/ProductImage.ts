import {
  DataTypes,
  InferAttributes,
  Model,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";

interface ProductImages
  extends Model<
    InferAttributes<ProductImages>,
    InferCreationAttributes<ProductImages>
  > {
  id: CreationOptional<number>;
  url: string;
  type: string;
  default: boolean;
  productVariantId: number;
}

// Define an Enum for the type of image
enum ImageType {
  IMAGE = "image",
  VIDEO = "video",
}

const ProductImages = sequelize.define<ProductImages>(
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
  },
  {
    timestamps: false,
  }
);

export default ProductImages;
