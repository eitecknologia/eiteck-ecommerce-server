import { Router } from "express";
import { check } from 'express-validator';

import { isAdminRole } from "../middlewares/roles-validate";
import { fieldsValidate } from "../middlewares/validate-fields";
import { validateJwt } from '../helpers/validate-jwt';
import { createSubcategory, getSubcategories, assignSubcategories, deleteDSubcategory, updateSubcategory, getSubcategoriesWithProducts, getSubcategoriesAvailability } from '../controller/subcategory';
import { verifyCategoryId, verifysubCategoryId, verifyRegisterOfCategoriesSubcategories } from '../helpers/db-helpers';
import { validateSubcategoriesInCategory } from '../middlewares/db-validate';

const subcategoryRouter: Router = Router();

/* Service - Register a subcategory */
subcategoryRouter.post('/create', [
    validateJwt,
    isAdminRole,
    check('name', 'El nombre es obligatorio').trim().notEmpty(),
    check('description', 'La descripción es obligatoria').optional().trim().notEmpty(),
    fieldsValidate
], createSubcategory);

/* Service - Update a Category */
subcategoryRouter.put('/update/:id', [
    validateJwt,
    isAdminRole,
    check('id', 'Formato de id incorrecto').isNumeric(),
    check('id').custom(verifysubCategoryId),
    check('name', 'El nombre es obligatorio').optional().trim().notEmpty(),
    check('description', 'La descripción es obligatoria').optional().trim().notEmpty(),
    fieldsValidate
], updateSubcategory);

/* Service - Get all subcategories availables and not availables by category */
subcategoryRouter.get('/get_availability/:categoryid', [
    validateJwt,
    isAdminRole,
    check('categoryid', 'Formato de id incorrecto').isNumeric(),
    check('categoryid').custom(verifyCategoryId),
    fieldsValidate
], getSubcategoriesAvailability);

/* Service - Get all subcategories that at least contain a category */
subcategoryRouter.get('/get_subcategories', [
    validateJwt,
    isAdminRole,
    fieldsValidate
], getSubcategories);

/* Service - Assign to category */
subcategoryRouter.post('/assign_category', [
    validateJwt,
    isAdminRole,
    check('categoryid', 'Formato de id incorrecto').isNumeric(),
    check('categoryid').custom(verifyCategoryId),
    check('subcategories', 'Las subcategorías debe ser una lista no vacía').isArray().notEmpty(),
    check('subcategories.*.subcategoryid').custom(verifysubCategoryId),
    validateSubcategoriesInCategory,
    fieldsValidate
], assignSubcategories);

/* Service - Delete subcategory of a category */
subcategoryRouter.delete('/delete_of_category/:casubid', [
    validateJwt,
    isAdminRole,
    check('casubid', 'Formato de id incorrecto').isNumeric(),
    check('casubid').custom(verifyRegisterOfCategoriesSubcategories),
    fieldsValidate
], deleteDSubcategory);

/* 
    SERVICES TO ECOMMERCE - AUTH NOT REQUIRED
*/
/* Service - Get subcategories with products */
subcategoryRouter.get('/subcategories_products', getSubcategoriesWithProducts)

export default subcategoryRouter;