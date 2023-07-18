import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database/config";
import User from "./User";

interface Role
  extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  id: CreationOptional<number>;
  name: string;
}

const Role = sequelize.define<Role>(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

Role.hasOne(User, {
  foreignKey: "roleid",
  sourceKey: "id",
});

User.belongsTo(Role, {
  foreignKey: "roleid",
});

export default Role;
