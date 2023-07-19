import { Request, Response } from "express";
import {
  DiscountCode,
  Product,
  ProductImages,
  Role,
  ShoppingCart,
} from "../models";
import { IVA } from "../common/constants";

/* Add product in cart Function */
export const addProductInCart = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    // /* Get data from the request body */
    // const { productId, quantity } = req.body;

    // /* Get data from the user logged */
    // const { userid } = req.user;

    // /* get stock of product */
    // const product = await Product.findOne({ attributes: ["stock"], where: { id:productId } });
    // const productStock = product?.stock || 0;

    // /* Verify the quantity of product */
    // if (quantity > productStock) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: "La cantidad es mayor al stock disponible",
    //     })
    // }

    // /* Verify if exist register of product in cart */
    // const productInCart = await ShoppingCart.findOne({ where: { productId, userid } });

    // /* Verify if exist register of product in cart */
    // if (productInCart) {
    //     /* Increment quantity in cart */
    //     await productInCart.increment('quantity', { by: +quantity });
    // } else {
    //     /* Add product in usercart */
    //     await ShoppingCart.create({ productId, userid, quantity: +quantity });
    // }

    return res.status(200).json({
      ok: true,
      msg: "Producto agregado al carrito",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Get my shopping cart Function */
export const getMyShoppingCart = async (req: Request, res: Response) => {
  try {
    /* Get data from the user logged */
    const { userid, roleid } = req.user;

    /* Get the discountcode of query param */
    const { discountcode = null } = req.query;
    let discountDetails: {
      ok: boolean;
      msg: string;
      discountcode: null | string;
      discountpercent: null | number;
      discountid: null | number;
    } = {
      ok: false,
      msg: "Código no ingresado",
      discountid: null,
      discountcode: null,
      discountpercent: null,
    };

    /* Verify if exist discount code */
    if (discountcode) {
      /* Get discount code */
      const discount = await DiscountCode.findOne({
        where: { discountcode: discountcode as string },
      });
      if (!discount)
        discountDetails = {
          ok: false,
          msg: "Código no válido",
          discountcode: null,
          discountpercent: null,
          discountid: null,
        };

      /* Verify if the role is valid */
      const roleInfo = await Role.findOne({ where: { id: roleid } });

      if (discount) {
        if (
          roleInfo &&
          (roleInfo.name == discount?.accessrole ||
            discount?.accessrole == "ALL")
        ) {
          /* Verify if the discount code is active */
          if (!discount?.status)
            discountDetails = {
              ok: false,
              msg: "Código caducado",
              discountcode: null,
              discountpercent: null,
              discountid: null,
            };

          if (discount?.status)
            discountDetails = {
              ok: true,
              msg: "Código válido",
              discountcode: discount.discountcode,
              discountpercent: discount.discountpercent,
              discountid: discount.id,
            };
        } else {
          discountDetails = {
            ok: false,
            msg: "Código no válido para tu rol",
            discountcode: null,
            discountpercent: null,
            discountid: null,
          };
        }
      }
    }

    /* Get my shopping cart */
    const shoppingCart = await ShoppingCart.findAll({
      attributes: ["id", "quantity"],
      include: [
        {
          model: Product,
          as: "cart_product",
          attributes: ["id", "name", "price"],
          include: [
            {
              model: ProductImages,
              as: "product_media",
              attributes: ["id", "type", "url"],
            },
          ],
        },
      ],
      where: { userid },
      order: [["timecreated", "ASC"]],
    });

    /* Get total of the shopping cart */
    let totalCart = 0;
    let totalCartDiscount = 0;
    shoppingCart.forEach((item: any) => {
      totalCart += Number((item.cart_product.price * item.quantity).toFixed(2));
    });

    if (discountDetails.ok && discountDetails.discountpercent) {
      totalCartDiscount = Number(
        (
          totalCart -
          (totalCart * discountDetails.discountpercent) / 100
        ).toFixed(2)
      );
    }
    const ivaTotal = discountDetails.ok
      ? Number((totalCartDiscount * IVA).toFixed(2))
      : Number((totalCart * IVA).toFixed(2));
    const totalSale = discountDetails.ok
      ? Number((totalCartDiscount + ivaTotal).toFixed(2))
      : Number((totalCart + ivaTotal).toFixed(2));

    return res.status(200).json({
      ok: true,
      msg: "Mi carrito",
      totalCart,
      totalCartDiscount,
      ivaTotal,
      totalSale,
      discountDetails,
      shoppingCart,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Get my shopping cart Function */
export const updateQuantityShoppingCart = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(req.body);
    // /* Get data from the request params */
    // const { cartid } = req.params;

    // /* Get data from the request body */
    // const { quantity } = req.body;

    // /* Get info of cart */
    // const cart = await ShoppingCart.findOne({ where: { id:cartid } });

    // /* Get the stock of product */
    // const productId = cart?.productId;
    // const product = await Product.findOne({ attributes: ["stock", "name"], where: { id:productId } });
    // const productStock = product?.stock || 0;

    // /* Verify the quantity of product */
    // if (quantity > productStock) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: `La cantidad es mayor al stock disponible de "${product?.name}"}`,
    //     })
    // }

    // /* Update the quantity */
    // await cart?.update({ quantity: +quantity });

    return res.status(200).json({
      ok: true,
      msg: "Cantidad actualizada",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Delete register of shopping cart Function */
export const deleteRegisterOfShoppingCart = async (
  req: Request,
  res: Response
) => {
  try {
    /* Get the data from the request param */
    const { cartid } = req.params;

    /* Delete register of shopping cart */
    await ShoppingCart.destroy({ where: { id: cartid } });

    return res.status(200).json({
      ok: true,
      msg: "Registro eliminado del carrito de compras",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};
