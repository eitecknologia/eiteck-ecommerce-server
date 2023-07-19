import { Router } from "express";
import { check } from "express-validator";
import {
  verifyProductVariantId,
  verifyMediaProductId,
  verifyProductVariantProductId,
} from "../helpers/db-helpers";

import {
  addMediaToVariantProduct,
  createProductVariant,
  deleteProductVariant,
  deleteMediaVariantProduct,
  findProductVariantByProductId,
  getAllProductsVariants,
  updateVariantProduct,
  findProductVariantById,
} from "../controller/productVariant";
import { validateJwt } from "../helpers/validate-jwt";
import { isAdminRole } from "../middlewares/roles-validate";
import { fieldsValidate } from "../middlewares/validate-fields";

const productVariantRouter: Router = Router();

/* Service - Register a product */
productVariantRouter.post(
  "/create",
  [
    validateJwt,
    isAdminRole,
    check("productid", "Ingrese un id de producto válido")
      .notEmpty()
      .isNumeric(),
    check("name", "El nombre es obligatorio").notEmpty().trim(),
    check("stock", "El precio es obligatorio").notEmpty().isNumeric(),
    fieldsValidate,
  ],
  createProductVariant
);

/* Service - Get all products */
productVariantRouter.get(
  "/get_all/:productid",
  [
    check("productid", "Ingrese un id de producto válido")
      .notEmpty()
      .isNumeric(),
    fieldsValidate,
  ],

  getAllProductsVariants
);

/* Service - Get product by id */
productVariantRouter.get(
  "/get_by_id/:id",
  [
    check("id", "Ingrese un id válido").notEmpty().isNumeric(),
    check("id").custom(verifyProductVariantId),
    fieldsValidate,
  ],
  findProductVariantById
);

/* Service - Get product by id */
productVariantRouter.get(
  "/get_by_product_id/:id",
  [
    check("id", "Ingrese un id válido").notEmpty().isNumeric(),
    check("id").custom(verifyProductVariantProductId),
    fieldsValidate,
  ],
  findProductVariantByProductId
);

/* Service - Add resource */
productVariantRouter.post(
  "/add_media/:prodvarid",
  [
    validateJwt,
    isAdminRole,
    check("prodvarid", "Ingrese un id de la variante del producto")
      .notEmpty()
      .isNumeric(),
    check("prodvarid").custom(verifyProductVariantId),
    check("type", "El tipo del recurso es obligatorio").notEmpty().trim(),
    fieldsValidate,
  ],
  addMediaToVariantProduct
);

/* Service - Delete resource */
productVariantRouter.delete(
  "/delete_media/:prodmediaid",
  [
    validateJwt,
    isAdminRole,
    check("prodmediaid", "Ingrese un id válido").notEmpty().isNumeric(),
    check("prodmediaid").custom(verifyMediaProductId),
    fieldsValidate,
  ],
  deleteMediaVariantProduct
);

/* Service - Update a product */
productVariantRouter.put(
  "/update/:prodvarid",
  [
    validateJwt,
    isAdminRole,
    check("prodvarid", "Ingrese un id válido").notEmpty().isNumeric(),
    check("prodvarid").custom(verifyProductVariantId),
    check("name", "El nombre es obligatorio").optional().notEmpty().trim(),
    check("stock", "El precio es obligatorio")
      .optional()
      .notEmpty()
      .isNumeric(),
    fieldsValidate,
  ],
  updateVariantProduct
);

/* Service - Delete product by id */
productVariantRouter.delete(
  "/delete/:prodvarid",
  [
    validateJwt,
    isAdminRole,
    check("prodvarid", "Formato de id incorrecto").notEmpty().isNumeric(),
    check("prodvarid").custom(verifyProductVariantId),
    fieldsValidate,
  ],
  deleteProductVariant
);

export default productVariantRouter;
