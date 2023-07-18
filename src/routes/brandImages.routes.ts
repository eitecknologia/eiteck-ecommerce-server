import { Router } from "express";
import { query } from "express-validator";
import {
  createBrand,
  getAllBrands,
  deleteBrand,
} from "../controller/brandImages";
import { validateJwt } from "../helpers/validate-jwt";
import { isAdminRole } from "../middlewares/roles-validate";

const brandRouter: Router = Router();

/* Service - Register a Banner Image */
brandRouter.post(
  "/create",
  [validateJwt, isAdminRole],
  createBrand
);

/* Service - Get all Banners */
brandRouter.get(
  "/all",
  [
    query("page", "El parámetro page es requerido")
      .optional()
      .isNumeric(),
    query("size", "El parámetro size es requerido")
      .optional()
      .isNumeric(),
  ],
  getAllBrands
);

/* Service - Delete Banner */
brandRouter.delete(
  "/delete/:id",
  [validateJwt, isAdminRole],
  deleteBrand
);

export default brandRouter;