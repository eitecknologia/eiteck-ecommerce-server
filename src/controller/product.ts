import { Request, Response } from "express";
// import { CategorySubcategory, Product, ProductImages, SaleProduct, Subcategory, SubcategoryProducts } from "../models";
import {
  CategorySubcategory,
  Product,
  ProductImages,
  Subcategory,
  SubcategoryProducts,
} from "../models";
import sequelize from "../database/config";
import { Op } from "sequelize";
import { infoPaginate, validatePaginateParams } from "../helpers/pagination";
import { deleteFiles } from "../helpers/files";

/* Register product Function */
export const createProduct = async (req: Request, res: Response) => {
  try {
    /* Get the data from the request body */
    const { name, description, price }: Product = req.body;

    /* Subcategories of body */
    const subcategories: number[] = req.body.subcategories;

    /* Transaction of product create */
    await sequelize.transaction(async (t) => {
      const product = await Product.create(
        {
          name,
          description,
          price,
        },
        { transaction: t }
      );

      /* Add the subcategories to the product */
      for (const subcategoryId of subcategories) {
        await SubcategoryProducts.create(
          {
            productid: product.id,
            subcategoryid: subcategoryId,
          },
          { transaction: t }
        );
      }
    });

    return res.status(201).json({
      ok: true,
      msg: "Producto Creado",
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
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { page, size } = req.query;
    const { offset, limit, pageSend, sizeSend } = await validatePaginateParams(
      page,
      size
    );

    const products = await Product.findAll({
      attributes: ["id", "name", "description", "price", "stock", "createdAt"],
      include: [
        {
          model: ProductImages,
          as: "product_media",
          attributes: ["id", "type", "url"],
        },
        {
          model: SubcategoryProducts,
          as: "products_subcategories",
          attributes: ["id"],
          include: [
            {
              model: Subcategory,
              as: "subcategory_products",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      where: { isActive: true },
      order: [["createdAt", "DESC"]],
      offset: offset - sizeSend,
      limit,
    });

    /* Calculate the total of pages */
    const total = await Product.count({ where: { isActive: true } });
    const totalPages = Math.ceil(total / limit);
    const info = await infoPaginate(totalPages, total, pageSend, sizeSend);

    return res.status(201).json({
      ok: true,
      msg: "Listado de productos",
      info,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Get all products by category Function */
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { page, size } = req.query;
    const { offset, limit, pageSend, sizeSend } = await validatePaginateParams(
      page,
      size
    );

    const { categoryid } = req.params;

    /* Get the ids of each subcategory in the category */
    const subcategoriesInCategory = await CategorySubcategory.findAll({
      attributes: ["subcategoryid"],
      where: { categoryid },
    });
    const subcategoriesIdsArray = subcategoriesInCategory.map(
      (subcategory) => subcategory.subcategoryid
    );

    /* Get the ids of each product in the subcategories */
    const productsInSubcategories = await SubcategoryProducts.findAll({
      attributes: ["productid"],
      where: { subcategoryid: { [Op.in]: subcategoriesIdsArray } },
    });
    const productsIdsArray = productsInSubcategories.map(
      (product) => product.productid
    );

    const products = await Product.findAll({
      attributes: ["id", "name", "description", "price", "stock", "createdAt"],
      include: [
        {
          model: ProductImages,
          as: "product_media",
          attributes: ["id", "type", "url"],
        },
      ],
      where: {
        isActive: true,
        id: { [Op.in]: productsIdsArray },
      },
      order: [["createdAt", "DESC"]],
      offset: offset - sizeSend,
      limit,
    });

    /* Calculate the total of pages */
    const total = await Product.count({
      where: { isActive: true, id: { [Op.in]: productsIdsArray } },
    });
    const totalPages = Math.ceil(total / limit);
    const info = await infoPaginate(totalPages, total, pageSend, sizeSend);

    return res.status(201).json({
      ok: true,
      msg: "Listado de productos por categoria",
      info,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Get all products by category Function */
export const getProductsBySubcategory = async (req: Request, res: Response) => {
  try {
    const { page, size } = req.query;
    const { offset, limit, pageSend, sizeSend } = await validatePaginateParams(
      page,
      size
    );

    const { subcategoryid } = req.params;

    /* Get the ids of each product in the subcategories */
    const productsInSubcategories = await SubcategoryProducts.findAll({
      attributes: ["productid"],
      where: { subcategoryid },
    });
    const productsIdsArray = productsInSubcategories.map(
      (product) => product.productid
    );

    const products = await Product.findAll({
      attributes: ["id", "name", "description", "price", "stock", "createdAt"],
      include: [
        {
          model: ProductImages,
          as: "product_media",
          attributes: ["id", "type", "url"],
        },
      ],
      where: {
        isActive: true,
        id: { [Op.in]: productsIdsArray },
      },
      order: [["createdAt", "DESC"]],
      offset: offset - sizeSend,
      limit,
    });

    /* Calculate the total of pages */
    const total = await Product.count({
      where: { isActive: true, id: { [Op.in]: productsIdsArray } },
    });
    const totalPages = Math.ceil(total / limit);
    const info = await infoPaginate(totalPages, total, pageSend, sizeSend);

    return res.status(201).json({
      ok: true,
      msg: "Listado de productos por categoría",
      info,
      products,
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
export const findProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      attributes: { exclude: ["isActive", "createdAt"] },
      where: { isActive: true, id: id },
      include: [
        {
          model: ProductImages,
          as: "product_media",
          attributes: ["id", "type", "url"],
        },
      ],
    });

    return res.status(200).json({
      ok: true,
      msg: "Producto encontrado",
      product,
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
export const addResourceToProduct = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    // /* Get the data from the request body */
    // let { type, url = null } = req.body;
    // const image = req.files?.image || null;

    // /* Get the data from the request param */
    // const { productid } = req.params;

    // /* Verify if exist at least an image or url */
    // if (!image && !url) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: "Debe enviar al menos una imagen o una url"
    //     })
    // }

    // /* Verify if send an image to save */
    // if (image) {
    //     url = await uploadFiles(image);
    // }

    // /* Add resource */
    // await ProductImages.create({
    //     productid: +productid,
    //     type,
    //     url
    // });

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
export const deleteResourceProduct = async (req: Request, res: Response) => {
  try {
    /* Get the data from the request param */
    const { resourceid } = req.params;

    /* Get the resource info */
    const resource = await ProductImages.findByPk(resourceid);

    /* Delete the image from cloudinary */
    if (resource?.url) {
      await deleteFiles(resource.url);
    }

    /* Delete the resource */
    await resource?.destroy();

    return res.status(201).json({
      ok: true,
      msg: "Recurso eliminado",
      resourceid,
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
export const updateProduct = async (req: Request, res: Response) => {
  try {
    /* Get the data from the request body */
    const { name, description, price }: Product = req.body;

    /* Subcategories of body */
    const subcategories: number[] = req.body.subcategories || [];

    /* Get the data from the request param */
    const { productid } = req.params;

    /* Transaction of product create */
    await sequelize.transaction(async (t) => {
      const product = await Product.findByPk(productid);

      await product?.update(
        {
          name,
          description,
          price,
        },
        { transaction: t }
      );

      /* Product to add in subcategories */
      if (subcategories.length > 0) {
        for (const subcategoryid of subcategories) {
          const existRegister = await SubcategoryProducts.findOne({
            where: { productid, subcategoryid },
          });
          if (!existRegister) {
            await SubcategoryProducts.create(
              { productid: +productid, subcategoryid },
              { transaction: t }
            );
          }
        }
      }
    });

    return res.status(201).json({
      ok: true,
      msg: "Producto Actualizado",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Get availability of subcategories of a product Function */
export const availabilitySubcategories = async (
  req: Request,
  res: Response
) => {
  try {
    const { productid } = req.params;

    const subcategoriesWithProduct = await SubcategoryProducts.findAll({
      attributes: { exclude: ["id", "subcategoryid", "createdAt"] },
      include: [
        {
          model: Subcategory,
          attributes: { exclude: ["isActive", "createdAt"] },
          as: "subcategory_products",
        },
      ],
      where: { productid },
    });

    const categoriesWithProductsIds = subcategoriesWithProduct.map(
      (register: any) => register.subcategory_products.subcategoryid
    );

    const subcategoriesAvailables = await Subcategory.findAll({
      attributes: ["id", "name", "description"],
      where: {
        id: { [Op.notIn]: categoriesWithProductsIds },
        isActive: true,
      },
      order: [["createdAt", "DESC"]],
    });

    /* Get all subcategories */
    const subcategories = await Subcategory.findAll({
      attributes: ["id", "name", "description"],
      where: { isActive: true },
      order: [["createdAt", "DESC"]],
    });

    return res.status(201).json({
      ok: true,
      msg: "Disponibilidad de producto en subcategorías",
      subcategoriesWithProduct,
      subcategoriesAvailables,
      subcategories,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Delete Product of subcategory Function */
export const deleteProductOfSubcategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { subprodid } = req.params;

    await SubcategoryProducts.destroy({ where: { id: subprodid } });

    return res.status(200).json({
      ok: true,
      msg: "Producto eliminado de subcategoría",
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
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    // const { productid } = req.params;

    // /* Get the images Reward Images */
    // const images: ProductImages[] = await ProductImages.findAll({ where: { productid } }) || [];

    // /* Delete the image from cloudinary */
    // for (const { url } of images) {
    //     await deleteFiles(url);
    // }

    // /* Delete the url images from the DB */
    // await ProductImages.destroy({ where: { productid } });

    // await Product.update({
    //     isActive: false
    // }, { where: { id:productid } });

    return res.status(200).json({
      ok: true,
      msg: "Producto Eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Get products most selled Function */
export const productsMostSelled = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    // /* Get the limit of query */
    // const { limit = 5 } = req.query;

    // /* Get the products most selled in sales table */
    // const productsMostSelled = await SaleProduct.findAll({
    //     attributes: ['id', [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalsold']],
    //     group: ['id'],
    //     order: [[Sequelize.literal('totalsold'), 'DESC']],
    //     limit: +limit
    // });

    // const mostSelledIds = productsMostSelled.map(id => id.productid) || [];

    // const mostSelled = await Product.findAll({
    //     attributes: ['id', 'name', 'description', 'price', 'stock'],
    //     include: [{
    //         model: ProductImages,
    //         as: 'product_media',
    //         attributes: ["id", 'type', 'url']
    //     }],
    //     where: { id: mostSelledIds }
    // })

    return res.status(200).json({
      ok: true,
      msg: "Productos mas vendidos",
      // mostSelled
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/* Get products new arrived Function */
export const productsNewArrived = async (req: Request, res: Response) => {
  try {
    /* Get the limit of query */
    const { limit = 5 } = req.query;

    /* Get the products most selled in sales table */
    const productsNewArrived = await Product.findAll({
      attributes: ["id", "name", "description", "price", "stock", "createdAt"],
      include: [
        {
          model: ProductImages,
          as: "product_media",
          attributes: ["id", "type", "url"],
        },
      ],
      where: { isActive: true },
      order: [["createdAt", "DESC"]],
      limit: +limit,
    });

    return res.status(200).json({
      ok: true,
      msg: "Productos recién llegados",
      productsNewArrived,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      error,
    });
  }
};
