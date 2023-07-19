import { Request, Response } from "express";
import { BrandsImages } from "../models";
import { validatePaginateParams, infoPaginate } from "../helpers/pagination";
import { deleteFiles, uploadFiles } from "../helpers/files";

/* Get all products by category Function */
export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const { page, size } = req.query;
    const { offset, limit, pageSend, sizeSend } = await validatePaginateParams(
      page,
      size
    );

    const banners = await BrandsImages.findAll({
      attributes: ["brandid", "name", "url"],
      order: [["timecreated", "DESC"]],
      offset: offset - sizeSend,
      limit,
    });

    /* Calculate the total of pages */
    const total = await BrandsImages.count({});
    const totalPages = Math.ceil(total / limit);
    const info = await infoPaginate(totalPages, total, pageSend, sizeSend);

    return res.status(201).json({
      ok: true,
      msg: "Listado de marcas",
      info,
      banners,
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
export const createBrand = async (req: Request, res: Response) => {
  try {
    const image = req.files?.image || null;

    const name = req.body.name || null;

    /* Verify if exist at least an image or url */
    if (!image) {
      return res.status(400).json({
        ok: false,
        msg: "No hay imagen para subir",
      });
    }

    const url = await uploadFiles(image);

    /* Add resource */
    await BrandsImages.create({
      name,
      url,
    });

    return res.status(201).json({
      ok: true,
      msg: "Marca agregada",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Delete banner */
export const deleteBrand = async (req: Request, res: Response) => {
  try {
    /* Get the data from the request param */
    const { id } = req.params;

    /* Get the resource info */
    const bannerImage = await BrandsImages.findByPk(id);

    /* Delete the image from cloudinary */
    if (bannerImage?.url) {
      await deleteFiles(bannerImage.url);
    }

    /* Delete the resource */
    await bannerImage?.destroy();

    return res.status(201).json({
      ok: true,
      msg: "Marca eliminada",
      id,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};
