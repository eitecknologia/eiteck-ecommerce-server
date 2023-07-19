import { Request, Response } from "express";
import { BannerImages } from "../models";
import { validatePaginateParams, infoPaginate } from "../helpers/pagination";
import { deleteFiles, uploadFiles } from "../helpers/files";

/* Get all products by category Function */
export const getAllBanners = async (req: Request, res: Response) => {
  try {
    const { page, size } = req.query;
    const { offset, limit, pageSend, sizeSend } = await validatePaginateParams(
      page,
      size
    );

    const banners = await BannerImages.findAll({
      attributes: ["id", "url"],
      order: [["timecreated", "DESC"]],
      offset: offset - sizeSend,
      limit,
    });

    /* Calculate the total of pages */
    const total = await BannerImages.count({});
    const totalPages = Math.ceil(total / limit);
    const info = await infoPaginate(totalPages, total, pageSend, sizeSend);

    return res.status(201).json({
      ok: true,
      msg: "Listado de banners",
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
export const   createBanner = async (req: Request, res: Response) => {
  try {
    const image = req.files?.image || null;

    /* Verify if exist at least an image or url */
    if (!image) {
      return res.status(400).json({
        ok: false,
        msg: "No hay imagen para subir",
      });
    }

    const url = await uploadFiles(image);

    /* Add resource */
    await BannerImages.create({
      url,
    });

    return res.status(201).json({
      ok: true,
      msg: "Banner agregado",
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
export const deleteBanner = async (req: Request, res: Response) => {
  try {
    /* Get the data from the request param */
    const { id } = req.params;

    /* Get the resource info */
    const bannerImage = await BannerImages.findByPk(id);

    /* Delete the image from cloudinary */
    if (bannerImage?.url) {
      await deleteFiles(bannerImage.url);
    }

    /* Delete the resource */
    await bannerImage?.destroy();

    return res.status(201).json({
      ok: true,
      msg: "Banner eliminado",
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
