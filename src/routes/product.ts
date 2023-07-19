import { Router } from "express";
import { check } from "express-validator";
import {
  verifyCategoryId,
  verifyProductId,
  verifyProductVariantId,
  verifyRegisterOfProductInSubcategory,
  verifyMediaProductId,
  verifySubcategoryIds,
} from "../helpers/db-helpers";

import {
  addResourceToProduct,
  availabilitySubcategories,
  createProduct,
  deleteProduct,
  deleteProductOfSubcategory,
  deleteResourceProduct,
  findProductById,
  getAllProducts,
  getProductsByCategory,
  getProductsBySubcategory,
  productsMostSelled,
  productsNewArrived,
  updateProduct,
} from "../controller/product";
import { validateJwt } from "../helpers/validate-jwt";
import { isAdminRole } from "../middlewares/roles-validate";
import { fieldsValidate } from "../middlewares/validate-fields";

const productRouter: Router = Router();

/* Service - Register a product */
productRouter.post(
  "/create",
  [
    validateJwt,
    isAdminRole,
    check("name", "El nombre es obligatorio").notEmpty().trim(),
    check("description", "La descripción es obligatoria").notEmpty().trim(),
    check("price", "El precio es obligatorio").notEmpty().isNumeric(),
    check("subcategories", "Las subcategorías debe ser una lista no vacía")
      .notEmpty()
      .isArray(),
    check("subcategories").custom(verifySubcategoryIds),
    fieldsValidate,
  ],
  createProduct
);

/* Service - Get all products */
productRouter.get("/get_all", getAllProducts);

/* Service - Get products by category */
productRouter.get(
  "/get_by_category/:categoryid",
  [
    check("categoryid", "Ingrese un id válido").notEmpty().isNumeric(),
    check("categoryid").custom(verifyCategoryId),
    fieldsValidate,
  ],
  getProductsByCategory
);

/* Service - Get products by subcategory */
productRouter.get(
  "/get_by_subcategory/:subcategoryid",
  [
    check("subcategoryid", "Ingrese un id válido").notEmpty().isNumeric(),
    check("subcategoryid").custom(verifyCategoryId),
    fieldsValidate,
  ],
  getProductsBySubcategory
);

/* Service - Get product by id */
productRouter.get(
  "/get_by_id/:id",
  [
    check("id", "Ingrese un id válido").notEmpty().isNumeric(),
    check("id").custom(verifyProductId),
    fieldsValidate,
  ],
  findProductById
);

/* Service - Add resource */
productRouter.post(
  "/add_resource/:prodvarid",
  [
    validateJwt,
    isAdminRole,
    check("prodvarid", "Ingrese un id de la variante del producto").notEmpty().isNumeric(),
    check("prodvarid").custom(verifyProductVariantId),
    check("type", "El tipo del recurso es obligatorio").notEmpty().trim(),
    fieldsValidate,
  ],
  addResourceToProduct
);

/* Service - Delete resource */
productRouter.delete(
  "/delete_resource/:prodmediaid",
  [
    validateJwt,
    isAdminRole,
    check("prodmediaid", "Ingrese un id válido").notEmpty().isNumeric(),
    check("prodmediaid").custom(verifyMediaProductId),
    fieldsValidate,
  ],
  deleteResourceProduct
);

/* Service - Update a product */
productRouter.put(
  "/update/:productid",
  [
    validateJwt,
    isAdminRole,
    check("productid", "Ingrese un id válido").notEmpty().isNumeric(),
    check("productid").custom(verifyProductId),
    check("name", "El nombre es obligatorio").optional().notEmpty().trim(),
    check("description", "La descripción es obligatoria")
      .optional()
      .notEmpty()
      .trim(),
    check("price", "El precio es obligatorio")
      .optional()
      .notEmpty()
      .isNumeric(),
    fieldsValidate,
  ],
  updateProduct
);

/* Service to get availability of subcategories */
productRouter.get(
  "/get_availability_subcategories/:productid",
  [
    validateJwt,
    isAdminRole,
    check("productid", "Formato de id incorrecto").isNumeric(),
    check("productid").custom(verifyProductId),
    fieldsValidate,
  ],
  availabilitySubcategories
);

/* Service - Delete Reward by id */
productRouter.delete(
  "/delete_of_subcategory/:subprodid",
  [
    validateJwt,
    isAdminRole,
    check("subprodid", "Formato de id incorrecto").notEmpty().isNumeric(),
    check("subprodid").custom(verifyRegisterOfProductInSubcategory),
    fieldsValidate,
  ],
  deleteProductOfSubcategory
);

/* Service - Delete product by id */
productRouter.delete(
  "/delete/:productid",
  [
    validateJwt,
    isAdminRole,
    check("productid", "Formato de id incorrecto").notEmpty().isNumeric(),
    check("productid").custom(verifyProductId),
    fieldsValidate,
  ],
  deleteProduct
);

/* Service - Get most selled products  */
productRouter.get("/most_selled", [], productsMostSelled);

/* Service - Get products new arrived */
productRouter.get("/new_arrived", [], productsNewArrived);

export default productRouter;
