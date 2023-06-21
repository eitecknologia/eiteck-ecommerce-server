import { Router } from "express";
import { createDiscountCode, deleteCode, getAllDiscountCodes, getCodeById, updateDiscountCode } from "../controller/discountcode";
import { check } from "express-validator";
import { verifyDiscountCodeId, verifyDiscountPercentageName, verifyRolesForPercentDiscount } from "../helpers/db-helpers";
import { validateJwt } from "../helpers/validate-jwt";
import { isAdminRole } from "../middlewares/roles-validate";
import { fieldsValidate } from "../middlewares/validate-fields";

const discountCodeRoutes: Router = Router();

/* Service - create stadium */
discountCodeRoutes.post('/create', [
    validateJwt,
    isAdminRole,
    check("discountcode", "El código de descuento es obligatorio").not().isEmpty(),
    check("discountcode").custom(verifyDiscountPercentageName),
    check("discountpercent", "El porcentaje de descuento es obligatorio 1 - 100").not().isEmpty().isFloat({ min: 1, max: 100 }),
    check("startdate", "La fecha de inicio es obligatoria").not().isEmpty().isDate(),
    check("finishdate", "La fecha de finalización es obligatoria").not().isEmpty().isDate(),
    check("accessrole").custom(verifyRolesForPercentDiscount),
    fieldsValidate
], createDiscountCode);

/* Service - get all codes */
discountCodeRoutes.get('/get_all', [
    validateJwt,
    isAdminRole,
    fieldsValidate
], getAllDiscountCodes);

/* Service - get code by id */
discountCodeRoutes.get('/get_by_id/:discountcodeid', [
    validateJwt,
    isAdminRole,
    check("discountcodeid", "El id del código de descuento es obligatorio").not().isEmpty().isNumeric(),
    check("discountcodeid").custom(verifyDiscountCodeId),
    fieldsValidate
], getCodeById);

/* Service - update code */
discountCodeRoutes.put('/update/:discountcodeid', [
    validateJwt,
    isAdminRole,
    check("discountcodeid", "El id del código de descuento es obligatorio").not().isEmpty().isNumeric(),
    check("discountcodeid").custom(verifyDiscountCodeId),
    check("discountcode", "El código de descuento es obligatorio").optional().not().isEmpty(),
    check("discountpercent", "El porcentaje de descuento es obligatorio 1 - 100").optional().not().isEmpty().isFloat({ min: 1, max: 100 }),
    check("startdate", "La fecha de inicio es obligatoria").optional().not().isEmpty().isDate(),
    check("finishdate", "La fecha de finalización es obligatoria").optional().not().isEmpty().isDate(),
    check("accessrole").optional().custom(verifyRolesForPercentDiscount),
    fieldsValidate
], updateDiscountCode);

/* Service - Delete code */
discountCodeRoutes.delete('/delete/:discountcodeid', [
    validateJwt,
    isAdminRole,
    check("discountcodeid", "El id del código de descuento es obligatorio").not().isEmpty().isNumeric(),
    check("discountcodeid").custom(verifyDiscountCodeId),
    fieldsValidate
], deleteCode);



export default discountCodeRoutes;