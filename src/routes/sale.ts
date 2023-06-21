import { Router } from "express";
import { check } from "express-validator";
import { getAllsales, getInvoiceDetails, getMySales, getSaleById, makeSale, registerInvoiceDetails, updateSaleStatus, uploadPaymentResource } from "../controller/sale";
import { verifyDiscountCodeId, verifyInvoiceDetailId, verifySaleid, verifyStockOfCart } from "../helpers/db-helpers";
import { validateJwt } from "../helpers/validate-jwt";
import { fieldsValidate } from "../middlewares/validate-fields";
import { isAdminRole } from "../middlewares/roles-validate";
import { SaleStatus } from "../common/constants";
import { validateFile } from "../middlewares/validate-files";

const saleRoutes: Router = Router();

/* ---------------------------------------------  Routes for Admin page  --------------------------------------------- */

/* Service - get all sales */
saleRoutes.get('/get_all', [
    validateJwt,
    isAdminRole,
    fieldsValidate
], getAllsales);

/* Service - get sale by id */
saleRoutes.get('/get_by_id/:saleid', [
    validateJwt,
    check("saleid", "El id de la venta es obligatorio").not().isEmpty().isNumeric(),
    check("saleid").custom(verifySaleid),
    fieldsValidate
], getSaleById);

/* Service - update sale status */
saleRoutes.put('/update_status/:saleid', [
    validateJwt,
    isAdminRole,
    check("saleid", "El id de la venta es obligatoria").not().isEmpty().isNumeric(),
    check("saleid").custom(verifySaleid),
    check("status", "El estado de la venta es obligatorio").not().isEmpty().isIn([SaleStatus.PAID, SaleStatus.DENY]),
    check("observation").optional().trim(),
    fieldsValidate
], updateSaleStatus);

/* ---------------------------------------------  Routes for the web page  --------------------------------------------- */

/* Service - register invoice detail */
saleRoutes.post('/register_invoice_detail', [
    validateJwt,
    check("ci", "La cédula o ruc es obligatoria").not().isEmpty().isNumeric(),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("lastname", "El apellido es obligatorio").not().isEmpty(),
    check("address", "La dirección es obligatoria").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("phone", "El teléfono es obligatorio").not().isEmpty(),
    fieldsValidate
], registerInvoiceDetails);

/* Service - Get invoice detail of logged user */
saleRoutes.get('/get_invoices_detail', [
    validateJwt,
    fieldsValidate
], getInvoiceDetails);

/* Service - make a sale */
saleRoutes.post('/make_sale', [
    validateJwt,
    check("invoiceid", "El del detalle de la factura es obligatorio").not().isEmpty().isNumeric(),
    check("invoiceid").custom(verifyInvoiceDetailId),
    check("subtotal", "El subtotal de la venta es obligatorio").not().isEmpty().isNumeric(),
    check("iva", "El iva de la venta es obligatorio").not().isEmpty().isNumeric(),
    check("totalsale", "El total de la venta es obligatorio").not().isEmpty().isNumeric(),
    check("discountcodeid").optional().custom(verifyDiscountCodeId),
    check("cart_ids", "los ids del carrito debe ser una lista no vacía").isArray(),
    check("cart_ids.*", "los ids del carrito deben ser numéricos").isNumeric(),
    check("cart_ids.*").custom(verifyStockOfCart),
    fieldsValidate
], makeSale);

/* Service - upload payment resource */
saleRoutes.put('/upload_payment_resource/:saleid', [
    validateJwt,
    validateFile,
    check("saleid", "El id de la venta es obligatorio").not().isEmpty().isNumeric(),
    check("saleid").custom(verifySaleid),
    check("observation").optional().trim(),
    fieldsValidate
], uploadPaymentResource);

/* Service - get my sales */
saleRoutes.get('/my_sales', [
    validateJwt,
    fieldsValidate
], getMySales)

export default saleRoutes;