// Dependencies
import express from "express";

// Router Profix
export const ProductRoutes = express.Router();

// Controller's
import ProductController from "../http/Controller/Product/ProductController.js";
import BuyProductController from "../http/Controller/Product/BuyProductController.js";
import NotificationController from "../http/Controller/Product/NotificationController.js";

ProductRoutes.post( "/create-product", ProductController.StorageProduct );
ProductRoutes.post( "/product/buy", BuyProductController.BuyProduct );

ProductRoutes.delete( "/product-delete", ProductController.delete );
ProductRoutes.get( "/product", ProductController.findAllProduct );

ProductRoutes.post( "/notification", NotificationController.Notification );