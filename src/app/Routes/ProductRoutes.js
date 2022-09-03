// Dependencies
import express from "express";

// Router Profix
export const ProductRoutes = express.Router();

// Controller's
import ProductController from "../http/Controller/Product/ProductController.js";

ProductRoutes.post( "/create-product", ProductController.StorageProduct );