import { Request, Response } from "express";
// import { CategorySubcategory, Product, ProductMedia, SaleProduct, Subcategory, SubcategoryProducts } from "../models";
import { ProductMedia, ProductVariant } from "../models";
import { infoPaginate, validatePaginateParams } from "../helpers/pagination";
import { deleteFiles, uploadFiles } from "../helpers/files";

/* Register product Function */
export const createProductVariant = async (req: Request, res: Response) => {
  try {
    /* Get the data from the request body */
    const { productid, name, stock }: ProductVariant = req.body;

    /* Transaction of product create */

    await ProductVariant.create({
      productid,
      name,
      stock,
    });

    return res.status(201).json({
      ok: true,
      msg: "Variante de Producto Creado",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Get all products Function */
export const getAllProductsVariants = async (req: Request, res: Response) => {
  try {
    const { page, size } = req.query;
    const { offset, limit, pageSend, sizeSend } = await validatePaginateParams(
      page,
      size
    );

    const { productid } = req.params;

    const productsVariants = await ProductVariant.findAll({
      attributes: ["prodvarid", "productid", "name", "stock", "timecreated"],
      include: [
        {
          model: ProductMedia,
          as: "product_media",
          attributes: ["prodmediaid", "type", "url"],
        },
      ],
      where: { isactive: true, productid },
      order: [["timecreated", "DESC"]],
      offset: offset - sizeSend,
      limit,
    });

    /* Calculate the total of pages */
    const total = productsVariants.length;
    const totalPages = Math.ceil(total / limit);
    const info = await infoPaginate(totalPages, total, pageSend, sizeSend);

    return res.status(201).json({
      ok: true,
      msg: "Listado de variantes de productos",
      info,
      productsVariants,
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

/* Get a product by id Function */
export const findProductVariantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productVariant = await ProductVariant.findOne({
      attributes: { exclude: ["isactive", "timecreated"] },
      where: { isactive: true, prodvarid: id },
      include: [
        {
          model: ProductMedia,
          as: "product_media",
          attributes: ["prodmediaid", "type", "url"],
        },
      ],
    });

    return res.status(200).json({
      ok: true,
      msg: "Variante de Producto encontrado",
      productVariant,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Get a product by id Function */
export const findProductVariantByProductId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productVariants = await ProductVariant.findAll({
      attributes: { exclude: ["isactive", "timecreated"] },
      where: { isactive: true, productid: id },
      include: [
        {
          model: ProductMedia,
          as: "product_media",
          attributes: ["prodmediaid", "type", "url"],
        },
      ],
    });

    return res.status(200).json({
      ok: true,
      msg: "Variante de Producto encontrado",
      productVariants,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};




/* Add resource Function */
export const addMediaToVariantProduct = async (req: Request, res: Response) => {
  try {
    /* Get the data from the request body */
    let { type, url = null } = req.body;
    const image = req.files?.image || null;

    /* Get the data from the request param */
    const { prodvarid } = req.params;

    // Validate type is image or video
    if (type !== "image" && type !== "video") {
      return res.status(400).json({
        ok: false,
        msg: "El tipo de recurso debe ser image o video",
      });
    }

    /* Verify if exist at least an image or url */
    if (!image && !url) {
      return res.status(400).json({
        ok: false,
        msg: "Debe enviar al menos una imagen o una url",
      });
    }

    /* Verify if send an image to save */
    if (image) {
      url = await uploadFiles(image);
    }

    /* Add resource */
    await ProductMedia.create({
      prodvarid: +prodvarid,
      type,
      url,
    });

    return res.status(201).json({
      ok: true,
      msg: "Recurso agregado",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Delete resource Function */
export const deleteMediaVariantProduct = async (
  req: Request,
  res: Response
) => {
  try {
    /* Get the data from the request param */
    const { prodmediaid } = req.params;

    /* Get the resource info */
    const resource = await ProductMedia.findByPk(prodmediaid);

    /* Delete the image from cloudinary */
    if (resource?.url) {
      await deleteFiles(resource.url);
    }

    /* Delete the resource */
    await resource?.destroy();

    return res.status(201).json({
      ok: true,
      msg: "Recurso eliminado",
      prodmediaid,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Update product Function */
export const updateVariantProduct = async (req: Request, res: Response) => {
  try {
    /* Get the data from the request body */
    const { name, stock }: ProductVariant = req.body;

    /* Get the data from the request param */
    const { prodvarid } = req.params;

    /* Transaction of product create */

    const product = await ProductVariant.findByPk(prodvarid);

    await product?.update({
      name,
      stock,
    });

    return res.status(201).json({
      ok: true,
      msg: "Variante de Producto Actualizado",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Delete Product Function */
export const deleteProductVariant = async (req: Request, res: Response) => {
  try {
    const { prodvarid } = req.params;

    await ProductVariant.update(
      {
        isactive: false,
      },
      { where: { prodvarid } }
    );

    return res.status(200).json({
      ok: true,
      msg: "Variante de Producto Eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};
