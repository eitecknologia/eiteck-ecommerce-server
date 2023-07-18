import { Meta } from "express-validator";
import { Category, Role, User, Product, Subcategory, CategorySubcategory, SubcategoryProducts, ProductImages, DiscountCode, ShoppingCart, InvoiceDetail, Sale } from "../models";

/* Create Defaul Roles */
export const createDefaultRoles = async () => {
    await Promise.all([
        Role.create({
            id: Number(process.env.ADMIN_ID),
            name: "ADMIN_ROLE"
        }),
        Role.create({
            id: Number(process.env.USER_ID),
            name: "USER_ROLE"
        })
    ]);
}

/* Verify if exist admin id */
export const verifyAdminId = async (id: number) => {
    /* Search if the user exists */
    const existUser = await User.findOne({ where: { id: id, roleid: process.env.ADMIN_ID, isActive: true } });
    if (!existUser) {
        throw new Error(`Administrador no encontrado`);
    }

    return true;
}

/* Verify if exist subcategory id */
export const verifysubCategoryId = async (id: number) => {
    /* Search if the subcategory exists */
    const existsubCategory = await Subcategory.findOne({ where: { id, isActive: true } });
    if (!existsubCategory) {
        throw new Error(`Subcategoría no encontrada`);
    }

    return true;
}

/* Verify if exist a register in CategoriesSubcategories table of a id */
export const verifyRegisterOfCategoriesSubcategories = async (id: number) => {
    /* Search if the register exists */
    const existsubRegister = await CategorySubcategory.findOne({ where: { id } });
    if (!existsubRegister) {
        throw new Error(`Registro no encontrado`);
    }

    return true;
}

/* Verify if exist a register in SubcategoriesProducts table of a id */
export const verifyRegisterOfProductInSubcategory = async (id: number) => {
    /* Search if the register exists */
    const existsubRegister = await SubcategoryProducts.findOne({ where: { id } });
    if (!existsubRegister) {
        throw new Error(`Registro no encontrado`);
    }

    return true;
}

/* Verify if exist category id */
export const verifyCategoryId = async (id: number) => {
    /* Search if the category exists */
    const existCategory = await Category.findOne({ where: { id, isActive: true } });
    if (!existCategory) {
        throw new Error(`Categoria no encontrada`);
    }

    return true;
}

/* Verify if exist resourceProductId */
export const verifyResourceProductId = async (id: number) => {
    const existResource = await ProductImages.findOne({ where: { id } });
    if (!existResource) {
        throw new Error(`Recurso no encontrado`);
    }

    return true;
}

/* Verify if exist category id */
export const verifyProductId = async (id: number) => {
    /* Search if the product exists */
    const existProduct = await Product.findOne({ where: { id, isActive: true } });
    if (!existProduct) {
        throw new Error(`Producto no encontrado`);
    }

    return true;
}


/* Verify the stock of product */
export const verifyStockProduct = async (amount: number, req: Meta) => {
    const { productid } = req.req.body;
    const product = await Product.findOne({ where: { id:productid, isActive: true } });
    if (!product) {
        throw new Error(`Producto no encontrado`);
    }

    // const { stock } = product;
    const  stock  = 0;
    
    if (stock) {
        if (amount > stock) {
            throw new Error(`Sin stock`);
        }
    }

    return true;
}

/* Verify if exist subcategory ids */
export const verifySubcategoryIds = async (ids: number[]) => {
    for (const id of ids) {
        /* Search if the subcategory exists */
        const existsubCategory = await Subcategory.findOne({ where: { id, isActive: true } });
        if (!existsubCategory) {
            throw new Error(`Subcategoría no encontrada`);
        }
    }

    return true;
}

/* Verify roles for percent discount */
export const verifyRolesForPercentDiscount = async (accessrole: string) => {
    const validRoles = ["ALL"];

    if (!validRoles.includes(accessrole)) {
        throw new Error(`Rol no permitido - Permitidos: ${validRoles.join(", ")}`);
    }

    return true;
}

/* Verify code name exist */
export const verifyDiscountPercentageName = async (code: string) => {
    const existCode = await DiscountCode.findOne({ where: { discountcode: code } });
    if (existCode) {
        throw new Error(`El código ${code} ya se encuentra registrado`);
    }
    return true;
}

/* Verify if exist the code register */
export const verifyDiscountCodeId = async (id: number) => {
    const existRegister = await DiscountCode.findOne({ where: { id, isActive: true } });
    if (!existRegister) {
        throw new Error(`Código de descuento no encontrado`);
    }

    return true;
}

/* Verify if exist the shooping carte register */
export const verifyShoppingCartRegisterId = async (id: number) => {
    const existProduct = await ShoppingCart.findOne({ where: { id } });
    if (!existProduct) {
        throw new Error(`Registro no encontrado`);
    }

    return true;
}


/* Verify if exist the stock of products */
export const verifyStockOfCart = async (id: number) => {
    /* Get my shopping cart */
    const existRegister = await ShoppingCart.findOne({
        attributes: ['id', 'quantity'],
        include: [{
            model: Product,
            as: "cart_product",
            attributes: ['id', 'name', 'price', 'stock'],
            required: true
        }],
        where: { id }
    });

    if (!existRegister) {
        throw new Error(`Registro no encontrado`);
    }

    const stockRequired = existRegister.quantity;
    const stockAvailable = (existRegister as any)?.cart_product?.stock

    if (stockRequired > stockAvailable) {
        throw new Error(`La cantidad es mayor al stock disponible - Producto: ${(existRegister as any)?.cart_product?.name}`);
    }

    return true;
}

/* Verify if exist the invoide register */
export const verifyInvoiceDetailId = async (id: number) => {
    const existRegister = await InvoiceDetail.findOne({ where: { id } });
    if (!existRegister) {
        throw new Error(`Detalle no encontrado`);
    }

    return true;
}

/* Verify if exist the saleid */
export const verifySaleid = async (id: number) => {
    const existSale = await Sale.findOne({ where: { id } });
    if (!existSale) {
        throw new Error(`Venta no encontrada`);
    }

    return true;
}