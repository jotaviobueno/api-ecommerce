// Dependencies
import express from "express";

// Router Profix
export const UserRoutes = express.Router();

// Controller's
import UserController from "../http/Controller/User/UserController.js";
import AuthLoginController from "../http/Controller/User/AuthLoginController.js";

// Routes
UserRoutes.post( "/register", UserController.Storage );
UserRoutes.post( "/login", AuthLoginController.CreateSession );
