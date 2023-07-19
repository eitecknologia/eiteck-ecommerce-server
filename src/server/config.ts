import express, { Express, Response } from "express";
import fileUpload = require("express-fileupload");
import morgan = require("morgan");
import cors from "cors";

import {
  testRouter,
  authRouter,
  adminRouter,
  fileRouter,
  categoryRouter,
  productRouter,
  subcategoryRouter,
  usercartRouter,
  discountCodeRoutes,
  shoopingCartRoutes,
  saleRoutes,
  bannerRouter,
  brandRouter,
  productVariantRouter
} from "../routes";

import sequelize from "../database/config";
import userRouter from "../routes/user";
import "../models/index";
import { verifyCodesDiscount } from "../helpers/verify-Discounts";

export class Server {
  private readonly app: Express;
  private readonly port: string;
  private readonly prefix = "/api";
  private readonly paths: {
    testServer: string;
    auth: string;
    admin: string;
    user: string;
    file: string;
    category: string;
    product: string;
    subcategory: string;
    cart: string;
    discountcode: string;
    shoppingCart: string;
    sale: string;
    banner: string;
    brand: string;
    productVariant: string;
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.paths = {
      testServer: "/",
      auth: `${this.prefix}/auth`,
      admin: `${this.prefix}/admin`,
      user: `${this.prefix}/user`,
      file: `${this.prefix}/file`,
      category: `${this.prefix}/category`,
      subcategory: `${this.prefix}/subcategory`,
      product: `${this.prefix}/product`,
      cart: `${this.prefix}/cart`,
      discountcode: `${this.prefix}/discount_code`,
      shoppingCart: `${this.prefix}/shopping_cart`,
      sale: `${this.prefix}/sale`,
      banner: `${this.prefix}/banner`,
      brand: `${this.prefix}/brand`,
      productVariant: `${this.prefix}/productVariant`,
    };

    /* Middleware */
    this.middlewares();

    /* Routes */
    this.routes();

    /* DB Connection */
    this.dbConnection();

    /* Verify discount code */
    this.verifyDiscountCode();
  }

  middlewares() {
    /* Options for cors midddleware */
    this.app.use(cors());

    /* Body Parse */
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    /* Morgan config */
    this.app.get("env") !== "production" && this.app.use(morgan("dev"));

    /* File upload config*/
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    /* Defined Routes */
    this.app.use(this.paths.testServer, testRouter);
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.admin, adminRouter);
    this.app.use(this.paths.user, userRouter);
    this.app.use(this.paths.file, fileRouter);
    this.app.use(this.paths.category, categoryRouter);
    this.app.use(this.paths.product, productRouter);
    this.app.use(this.paths.subcategory, subcategoryRouter);
    this.app.use(this.paths.cart, usercartRouter);
    this.app.use(this.paths.discountcode, discountCodeRoutes);
    this.app.use(this.paths.shoppingCart, shoopingCartRoutes);
    this.app.use(this.paths.sale, saleRoutes);
    this.app.use(this.paths.banner, bannerRouter);
    this.app.use(this.paths.brand, brandRouter);
    this.app.use(this.paths.productVariant, productVariantRouter);

    /* Service not found - 404 */
    this.app.use((_req, res: Response) => {
      return res.status(404).json({
        ok: false,
        msg: "404 - Service not Found",
      });
    });
  }

  /* Verify the status of discount codes */
  async verifyDiscountCode() {
    verifyCodesDiscount();
  }

  async dbConnection() {
    /* Connection to the DB Postgres*/
    try {
      await sequelize.authenticate();
      /* await sequelize.sync(); - Use when the DB has been changed */
      // await sequelize.sync();
    //   await sequelize.sync({ alter: true })
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Port: `, this.port);
    });
  }
}
