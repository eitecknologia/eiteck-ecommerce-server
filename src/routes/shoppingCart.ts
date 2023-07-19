import { Router } from "express";
import { addProductInCart, deleteRegisterOfShoppingCart, getMyShoppingCart, updateQuantityShoppingCart } from "../controller/shoppingCart";
import { check } from "express-validator";
import { verifyProductId, verifyShoppingCartRegisterId } from "../helpers/db-helpers";
import { validateJwt } from "../helpers/validate-jwt";
import { fieldsValidate } from "../middlewares/validate-fields";

const shoopingCartRoutes: Router = Router();

/* Service - Add product in shopping cart */
shoopingCartRoutes.post('/add_product', [
    validateJwt,
    check('productid', 'Ingrese un id válido').notEmpty().isNumeric(),
    check('productid').custom(verifyProductId),
    check('quantity', 'Ingrese una cantidad válida').notEmpty().isNumeric(),
    fieldsValidate
], addProductInCart);

/* Service - Get my cart */
shoopingCartRoutes.get('/my_cart', [
    validateJwt,
    fieldsValidate
], getMyShoppingCart);

/* Service - Update quantity */
shoopingCartRoutes.put('/update_quantity/:cartid', [
    validateJwt,
    check('cartid', 'Ingrese un id válido').notEmpty().isNumeric(),
    check('cartid').custom(verifyShoppingCartRegisterId),
    /* Queantity greater than one */
    check('quantity', 'Ingrese una cantidad mayor a cero').notEmpty().isNumeric().isInt({ min: 1 }),
    fieldsValidate
], updateQuantityShoppingCart);

/* Service - Delete of cart */
shoopingCartRoutes.delete('/delete_of_cart/:cartid', [
    validateJwt,
    check('cartid', 'Ingrese un id válido').notEmpty().isNumeric(),
    check('cartid').custom(verifyShoppingCartRegisterId),
    fieldsValidate
], deleteRegisterOfShoppingCart);

export default shoopingCartRoutes;