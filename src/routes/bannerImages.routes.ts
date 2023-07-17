import { Router } from "express";
import { query } from "express-validator";
import {
  createBanner,
  getAllBanners,
  deleteBanner,
} from "../controller/bannerImages";
import { validateJwt } from "../helpers/validate-jwt";
import { isAdminRole } from "../middlewares/roles-validate";
import { fieldsValidate } from "../middlewares/validate-fields";
import { validateFile } from "../middlewares/validate-files";

const bannerRouter: Router = Router();

/* Service - Register a Banner Image */
bannerRouter.post(
  "/create",
  [validateJwt, isAdminRole, validateFile],
  createBanner
);

/* Service - Get all Banners */
bannerRouter.get(
  "/all",
  [
    query("page", "El parámetro page es requerido")
      .optional()
      .isNumeric(),
    query("size", "El parámetro size es requerido")
      .optional()
      .isNumeric(),
  ],
  getAllBanners
);

/* Service - Delete resource */
bannerRouter.delete(
  "/delete/:id",
  [validateJwt, isAdminRole, fieldsValidate],
  deleteBanner
);

export default bannerRouter;
