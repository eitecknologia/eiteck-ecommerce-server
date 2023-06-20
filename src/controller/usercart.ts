import { Request, Response } from "express";

/* Add product to cart Function */
export const addToCart = async (_req: Request, res: Response) => {
    try {

        return res.status(200).json({
            ok: true,
            msg: "Agregado al carrito"
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            error
        })
    }
}


