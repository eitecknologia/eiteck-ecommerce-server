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
  imageid: CreationOptional<number>;
  url: string;
  type: string;
  productid: number;
}

// Define an Enum for the type of image
enum ImageType {
  IMAGE = "image",
  VIDEO = "video",
}

const ProductImages = sequelize.define<ProductImages>(
  "product_media",
  {
    imageid: {
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
    productid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default ProductImages;
