import { Router } from "express";
import { fieldsValidate } from '../middlewares/validate-fields';
import { addToCart } from '../controller/usercart';
import { isUserRole } from '../middlewares/roles-validate';
import { validateJwt } from '../helpers/validate-jwt';
import { check } from 'express-validator';
import { verifyStockProduct } from '../helpers/db-helpers';

const usercartRouter: Router = Router();

usercartRouter.post('/add_to_cart', [
    validateJwt,
    isUserRole,
    check('amount', 'La cantidad debe ser un valor numérico').notEmpty().isNumeric(),
    check('productId').custom((amount, req) => verifyStockProduct(amount, req)),
    fieldsValidate
], addToCart);

usercartRouter.get('/my_cart', [
    validateJwt,
    isUserRole,
    fieldsValidate
],);

export default usercartRouter;