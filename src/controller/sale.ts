import { Request, Response } from "express";
import { DiscountCode, InvoiceDetail, Product, Sale, SaleProduct, ShoppingCart } from "../models";
import sequelize from "../database/config";
import { infoPaginate, validatePaginateParams } from "../helpers/pagination";
import { SaleStatus } from "../common/constants";
import { uploadFiles } from "../helpers/files";

/* Get invoides detail of logged user Function */
export const getAllsales = async (req: Request, res: Response) => {
    try {
        const { page, size } = req.query;
        let { status = null } = req.query;
        const { offset, limit, pageSend, sizeSend } = await validatePaginateParams(page, size);

        if (status != SaleStatus.PENDING && status != SaleStatus.PAID && status != SaleStatus.DENY && status != SaleStatus.RESERVED) status = null;

        const { count: total, rows: sales } = await Sale.findAndCountAll({
            attributes: ["saleid", "subtotal", "iva", "totalsale", "saledate", "status", "paymentresource", "observation"],
            where: {
                ...(status && { status }),
            },
            order: [
                ['saledate', 'DESC']
            ],
            offset: (offset - sizeSend),
            limit
        });

        const totalPages = (Math.ceil(total / limit));
        const info = await infoPaginate(totalPages, total, pageSend, sizeSend);

        return res.status(200).json({
            ok: true,
            msg: "Listado de ventas",
            info,
            sales
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}

/* Get invoides detail of logged user Function */
export const getSaleById = async (req: Request, res: Response) => {
    try {
        /* Get data from the request params */
        const { saleid } = req.params;

        const sale = await Sale.findOne({
            attributes: ["saleid", "totalsale", "status", "saledate", "paymentresource", "observation"],
            include: [
                {
                    model: SaleProduct,
                    as: "products_sale",
                    attributes: ["saleprodid", "quantity"],
                    include: [{
                        model: Product,
                        as: "sale_product",
                        attributes: ["name", "description", "price"]
                    }]
                },
                {
                    model: InvoiceDetail,
                    as: "sale_user_detail",
                    attributes: ["invoiceid", "ci", "name", "lastname", "address", "email", "phone"]
                },
                {
                    model: DiscountCode,
                    as: "discount_sale",
                    attributes: ["discountcodeid", "discountcode", "discountpercent", "startdate", "finishdate"]
                }
            ],
            where: { saleid }
        });

        return res.status(200).json({
            ok: true,
            msg: "Venta encontrada",
            sale
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}

/* Update sale status Function */
export const updateSaleStatus = async (req: Request, res: Response) => {
    try {

        /* Get data from the request params */
        const { saleid } = req.params;

        /* Get data from the request body */
        const { status, observation }: Sale = req.body;

        /* Verify if the status is DENY*/
        if (status == SaleStatus.DENY) {
            /* get products of sale to increment in stock */
            const products = await SaleProduct.findAll({ where: { saleid } });
            for (const { productid, quantity } of products) {
                const product = await Product.findOne({ where: { productid: productid } });
                await product?.increment('stock', { by: quantity });
            }
        }

        /* Update the sale */
        await Sale.update({
            status,
            observation
        }, { where: { saleid } });

        return res.status(200).json({
            ok: true,
            msg: "Estado de venta actualizada"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}

/* Register invoice detail Function */
export const registerInvoiceDetails = async (req: Request, res: Response) => {
    try {

        /* Get data from the request body */
        const { ci, name, lastname, address, email, phone, remember }: InvoiceDetail = req.body;

        /* Get the userid */
        const { userid } = req.user;

        /* Verify if not exist user with ci */
        const user = await InvoiceDetail.findOne({ where: { ci, userid } });

        /* If user exist */
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con esa cédula o ruc asociado a su cuenta"
            })
        }

        /* Create new invoide detail */
        const invoicedetails = await InvoiceDetail.create({
            ci, name, lastname, address, email, phone, remember, userid
        });

        return res.status(200).json({
            ok: true,
            msg: "Registro realizado con éxito",
            invoicedetails: {
                invoicedetailid: invoicedetails.invoiceid,
                ci: invoicedetails.ci,
                name: invoicedetails.name,
                lastname: invoicedetails.lastname
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}

/* Get invoides detail of logged user Function */
export const getInvoiceDetails = async (req: Request, res: Response) => {
    try {
        /* Get user logged id */
        const { userid } = req.user;

        /* Get invoices detail of user logged */
        const invoicesDetail = await InvoiceDetail.findAll({ where: { userid, remember: true } });

        return res.status(200).json({
            ok: true,
            msg: "Registros obtenidos con éxito",
            invoicesDetail
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}

/* Get invoides detail of logged user Function */
export const makeSale = async (req: Request, res: Response) => {
    try {

        /* Get data from the request body */
        const { invoiceid, cart_ids, totalsale, subtotal, iva, discountcodeid }: { invoiceid: number, cart_ids: number[], totalsale: number, subtotal: number, iva: number, discountcodeid: number } = req.body;

        /* Get the userid */
        const { userid } = req.user;

        let saleid = null;

        /* Transaction of sale */
        await sequelize.transaction(async (t) => {

            /* Create sale */
            const sale = await Sale.create({
                invoiceid, totalsale, userid, subtotal, iva, discountcodeid
            }, { transaction: t });

            /* Register products of sale */
            for (const cartid of cart_ids) {
                const cart = await ShoppingCart.findOne({ where: { cartid } });

                cart && await SaleProduct.create({
                    saleid: sale.saleid,
                    productid: cart.productid,
                    quantity: cart.quantity
                }, { transaction: t });

                await cart?.destroy({ transaction: t });

                /* Decrement the stock of products */
                const product = await Product.findOne({ where: { productid: cart?.productid } });
                await product?.decrement('stock', { by: cart?.quantity, transaction: t });
            }
            saleid = sale.saleid;
        })

        return res.status(200).json({
            ok: true,
            msg: "Venta solicitada con éxito",
            saleid
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}

/* upload payment resource of sale Function */
export const uploadPaymentResource = async (req: Request, res: Response) => {
    try {

        /* Get data from the request params */
        const { saleid } = req.params;

        /* Get data from the request body */
        const { observation }: Sale = req.body;

        /* Get the file of request */
        const file = req.files?.file;

        /* Upload file to cloudinary */
        const fileUrl = await uploadFiles(file);

        /* Update the sale */
        await Sale.update({
            observation,
            paymentresource: fileUrl,
            status: SaleStatus.PENDING
        }, { where: { saleid } });

        return res.status(200).json({
            ok: true,
            msg: "Pago enviado con éxito"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}

/* My sales Function */
export const getMySales = async (req: Request, res: Response) => {
    try {

        /* Get data from the user */
        const { userid } = req.user;

        /* Get sales of the user */
        const sales = await Sale.findAll({
            attributes: ["saleid", "subtotal", "iva", "totalsale", "status", "saledate", "paymentresource", "observation"],
            include: [
                {
                    model: SaleProduct,
                    as: "products_sale",
                    attributes: ["saleprodid", "quantity"],
                    include: [{
                        model: Product,
                        as: "sale_product",
                        attributes: ["name", "description", "price"]
                    }]
                },
                {
                    model: InvoiceDetail,
                    as: "sale_user_detail",
                    attributes: ["invoiceid", "ci", "name", "lastname", "address", "email", "phone"]
                }
            ],
            where: { userid },
            order: [
                ['saledate', 'DESC']
            ],
        });

        return res.status(200).json({
            ok: true,
            msg: "Mis compras",
            sales
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}

