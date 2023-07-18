import { Router } from "express";
import { check } from 'express-validator';
import { verifyCategoryId, verifyproductId, verifyRegisterOfProductInSubcategory, verifyResourceproductId, verifySubcategoryIds } from '../helpers/db-helpers';

import { addResourceToProduct, availabilitySubcategories, createProduct, deleteProduct, deleteProductOfSubcategory, deleteResourceProduct, findProductById, getAllProducts, getProductsByCategory, getProductsBySubcategory, productsMostSelled, productsNewArrived, updateProduct } from "../controller/product";
import { validateJwt } from "../helpers/validate-jwt";
import { isAdminRole } from "../middlewares/roles-validate";
import { fieldsValidate } from "../middlewares/validate-fields";

const productRouter: Router = Router();


/* Service - Register a product */
productRouter.post('/create', [
    validateJwt,
    isAdminRole,
    check('name', 'El nombre es obligatorio').notEmpty().trim(),
    check('description', 'La descripción es obligatoria').notEmpty().trim(),
    check('price', 'El precio es obligatorio').notEmpty().isNumeric(),
    check('stock', 'El stock es obligatorio').optional().notEmpty().isNumeric(),
    check('subcategories', 'Las subcategorías debe ser una lista no vacía').notEmpty().isArray(),
    check('subcategories').custom(verifySubcategoryIds),
    fieldsValidate
], createProduct);

/* Service - Get all products */
productRouter.get('/get_all', getAllProducts);

/* Service - Get products by category */
productRouter.get('/get_by_category/:categoryid', [
    check('categoryid', 'Ingrese un id válido').notEmpty().isNumeric(),
    check('categoryid').custom(verifyCategoryId),
    fieldsValidate
], getProductsByCategory);

/* Service - Get products by subcategory */
productRouter.get('/get_by_subcategory/:subcategoryid', [
    check('subcategoryid', 'Ingrese un id válido').notEmpty().isNumeric(),
    check('subcategoryid').custom(verifyCategoryId),
    fieldsValidate
], getProductsBySubcategory);

/* Service - Get product by id */
productRouter.get('/get_by_id/:id', [
    check('id', 'Ingrese un id válido').notEmpty().isNumeric(),
    check('id').custom(verifyproductId),
    fieldsValidate
], findProductById);

/* Service - Add resource */
productRouter.post('/add_resource/:productId', [
    validateJwt,
    isAdminRole,
    check('productId', 'Ingrese un id válido').notEmpty().isNumeric(),
    check('productId').custom(verifyproductId),
    check('type', 'El tipo del recurso es obligatorio').notEmpty().trim(),
    check('url', 'La url es obligatoria').optional().notEmpty().trim().isURL(),
    check('resource', 'El recurso es obligatorio').optional().notEmpty().trim(),
    fieldsValidate
], addResourceToProduct);

/* Service - Delete resource */
productRouter.delete('/delete_resource/:resourceid', [
    validateJwt,
    isAdminRole,
    check('resourceid', 'Ingrese un id válido').notEmpty().isNumeric(),
    check('resourceid').custom(verifyResourceproductId),
    fieldsValidate
], deleteResourceProduct);

/* Service - Update a product */
productRouter.put('/update/:productId', [
    validateJwt,
    isAdminRole,
    check('productId', 'Ingrese un id válido').notEmpty().isNumeric(),
    check('productId').custom(verifyproductId),
    check('name', 'El nombre es obligatorio').optional().notEmpty().trim(),
    check('description', 'La descripción es obligatoria').optional().notEmpty().trim(),
    check('price', 'El precio es obligatorio').optional().notEmpty().isNumeric(),
    check('stock', 'El stock es obligatorio').optional().notEmpty().isNumeric(),
    fieldsValidate
], updateProduct);

/* Service to get availability of subcategories */
productRouter.get('/get_availability_subcategories/:productId', [
    validateJwt,
    isAdminRole,
    check('productId', 'Formato de id incorrecto').isNumeric(),
    check('productId').custom(verifyproductId),
    fieldsValidate
], availabilitySubcategories);

/* Service - Delete Reward by id */
productRouter.delete('/delete_of_subcategory/:subprodid', [
    validateJwt,
    isAdminRole,
    check('subprodid', 'Formato de id incorrecto').notEmpty().isNumeric(),
    check('subprodid').custom(verifyRegisterOfProductInSubcategory),
    fieldsValidate
], deleteProductOfSubcategory);

/* Service - Delete product by id */
productRouter.delete('/delete/:productId', [
    validateJwt,
    isAdminRole,
    check('productId', 'Formato de id incorrecto').notEmpty().isNumeric(),
    check('productId').custom(verifyproductId),
    fieldsValidate
], deleteProduct);

/* Service - Get most selled products  */
productRouter.get('/most_selled', [

], productsMostSelled);

/* Service - Get products new arrived */
productRouter.get('/new_arrived', [

], productsNewArrived)


export default productRouter;
