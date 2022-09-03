// Dependencies
import express from "express";
import dotenv from "dotenv";

// Port
const port = 8081;

// DataBase Connect
import {Connect} from "./config/MongooseConnect.js";

// Routes
import {UserRoutes} from "./app/Routes/UserRoutes.js";
import {ProductRoutes} from "./app/Routes/ProductRoutes.js";

// Config
const app = express();

dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", UserRoutes);
app.use("/", ProductRoutes);

if ( await Connect() ) {
	app.listen( port, () => {
		console.log( "listen on!" );
	});
}