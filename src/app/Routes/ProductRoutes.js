// Dependencies
import express from "express";

// Router Profix
export const ProductRoutes = express.Router();

// Controller's
import ProductController from "../http/Controller/Product/ProductController.js";
import BuyProductController from "../http/Controller/Product/BuyProductController.js";

// ServicesRoute
import Mercadopago from "../http/Services/MercadoPago/MercadoPagoServices.js";
ProductRoutes.post( "/notification", Mercadopago.notification );


ProductRoutes.post( "/create-product", ProductController.StorageProduct );
ProductRoutes.post( "/product/buy", BuyProductController.BuyProduct );