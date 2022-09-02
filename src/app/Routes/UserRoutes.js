// Dependencies
import express from "express";

// Router Profix
export const UserRoutes = express.Router();

// Controller's
import UserController from "../http/Controller/User/UserController.js";


// Routes
UserRoutes.post( "/register", UserController.Storage );
