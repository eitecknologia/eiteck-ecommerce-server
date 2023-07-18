import { Request, Response } from "express";
import { DiscountCode, Sale, User } from "../models";
import { infoPaginate, validatePaginateParams } from "../helpers/pagination";
import { Op } from "sequelize";
import { currentDateMounth } from "../helpers/app-helpers";

/* Create Discount Code Function */
export const createDiscountCode = async (req: Request, res: Response) => {
    try {

        /* Get data from the request body */
        const { discountcode, discountpercent, startdate, finishdate, accessrole }: DiscountCode = req.body;

        /* Get user */
        const { userid } = req.user;

        /* Get current Date */
        const currentDate = new Date(currentDateMounth());

        /* Verify date */
        if (startdate > finishdate) {
            return res.status(400).json({
                ok: false,
                msg: "La fecha de inicio no puede ser mayor a la fecha de finalización"
            })
        }

        const statusDiscountCode = (new Date(startdate) <= currentDate && new Date(finishdate) >= currentDate) ? true : false;

        /* Create new discount code */
        await DiscountCode.create({
            discountcode,
            discountpercent,
            startdate,
            finishdate,
            accessrole,
            status: statusDiscountCode,
            userid
        });

        return res.status(201).json({
            ok: true,
            msg: "Código de descuento creado"
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}

/* Create Discount Code Function */
export const getAllDiscountCodes = async (req: Request, res: Response) => {
    try {

        /* Pagination Params */
        const { page, size } = req.query;
        const { offset, limit, pageSend, sizeSend } = await validatePaginateParams(page, size);

        /* Filter query param */
        let { role = null } = req.query;
        const validRoles = ["ALL"];
        (role) && (validRoles.includes(role as string)) ? role = role : role = null;

        const { count: total, rows: discountcodes } = await DiscountCode.findAndCountAll({
            attributes: ["id", "discountcode", "discountpercent", "startdate", "finishdate", "accessrole", "status"],
            where: {
                isactive: true,
                ...(role) && { accessrole: (role as string) }
            },
            order: [['createdAt', 'DESC']],
            offset: (offset - sizeSend),
            limit: limit
        });

        /* Calculate the total of pages */
        const totalPages = (Math.ceil(total / limit));
        const info = await infoPaginate(totalPages, total, pageSend, sizeSend);

        return res.status(201).json({
            ok: true,
            msg: "Listado de códigos de descuento",
            info,
            discountcodes
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}

/* Create Discount Code Function */
export const getCodeById = async (req: Request, res: Response) => {
    try {

        /* Pagination Params */
        const { discountcodeid } = req.params;

        const discountcode = await DiscountCode.findOne({
            attributes: ["id", "discountcode", "discountpercent", "startdate", "finishdate", "accessrole", "status"],
            include: [{
                model: User,
                as: "author_discount",
                attributes: ["id", "ci", "name", "lastname"]
            }],
            where: { id: discountcodeid }
        });

        return res.status(201).json({
            ok: true,
            msg: "Listado de códigos de descuento",
            discountcode
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}

/* Update Discount Code Function */
export const updateDiscountCode = async (req: Request, res: Response) => {
    try {

        /* Get data from the request body */
        const { discountcode, discountpercent, startdate, finishdate, accessrole }: DiscountCode = req.body;
        /* Get data param */
        const { discountcodeid } = req.params;

        /* Veriy if the discount name exist */
        if (discountcode) {
            const discountCodeExist = await DiscountCode.findOne({ where: { discountcode, id: { [Op.ne]: discountcodeid } } });
            if (discountCodeExist) {
                return res.status(400).json({
                    ok: false,
                    msg: "El código de descuento ya existe"
                })
            }
        }

        /* Get discount data */
        const discountCodeInfo = await DiscountCode.findOne({ where: { id:discountcodeid } });
        const newStartDate = (startdate) ? startdate : discountCodeInfo?.startdate!;
        const newFinishDate = (finishdate) ? finishdate : discountCodeInfo?.finishdate!;

        /* Get current Date */
        const currentDate = new Date(currentDateMounth());

        /* Verify date */
        if (newStartDate > newFinishDate) {
            return res.status(400).json({
                ok: false,
                msg: "La fecha de inicio no puede ser mayor a la fecha de finalización"
            })
        }

        const statusDiscountCode = (new Date(newStartDate) <= currentDate && new Date(newFinishDate) >= currentDate) ? true : false;

        /* Update discount code */
        await discountCodeInfo?.update({
            discountcode,
            discountpercent,
            startdate: newStartDate,
            finishdate: newFinishDate,
            accessrole,
            status: statusDiscountCode
        });


        return res.status(201).json({
            ok: true,
            msg: "Código de descuento actualizado"
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

/* Delete Discount Code Function */
export const deleteCode = async (req: Request, res: Response) => {
    try {

        /* Pagination Params */
        const { discountcodeid } = req.params;

        /* verify if the code was used in any sale */
        const codeWasUsed = await Sale.findOne({ where: { discountcodeid } });

        /* Delete the code */
        if (codeWasUsed) {
            await DiscountCode.update({ isactive: false }, { where: { id:discountcodeid } });
        } else {
            await DiscountCode.destroy({ where: { id:discountcodeid } });
        }

        return res.status(201).json({
            ok: true,
            msg: "Código eliminado"
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}


