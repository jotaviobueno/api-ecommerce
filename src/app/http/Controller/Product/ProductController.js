// Repository
import repository from "../../Repository/Product/ProductRepository.js";

// Helper's
import UserHelper from "../../../Helpers/User/UserHelper.js";
import ResponseHelper from "../../../Helpers/ResponseHelper.js";
import AuthLoginHelper from "../../../Helpers/User/AuthLoginHelper.js";

// Services

// Config
import { lowestPrice, minimumInStock, MaximumStock } from "../../../../config/Config.js";

class ProductController {
	async StorageProduct ( req, res ) {
		const { session_id } = req.headers;
		const { title, price, stock } = req.body;

		const SessionInformation = await AuthLoginHelper.ExistSession( session_id );

		if (! SessionInformation )
			return ResponseHelper.unprocessableEntity( res, { error: "session_id invalid" } );

		const UserInformation = await UserHelper.ExistEmail( SessionInformation.email );

		if (! UserInformation )
			return ResponseHelper.unprocessableEntity( res, { error: "email already registered" } );

		if ( lowestPrice >= price )
			return ResponseHelper.unprocessableEntity( res, { error: "product price can not be less than $3" } );

		if ( minimumInStock >= stock )
			return ResponseHelper.unprocessableEntity( res, { error: "the stock may not be less than 3 quantities" } );

		if (  stock >= MaximumStock )
			return ResponseHelper.unprocessableEntity( res, { error: "the stock cannot be larger than 5000 units" } );

		const StorageInformation = await new repository( UserInformation.email, UserInformation.username, title, price, stock ).StorageProduct();

		if ( StorageInformation )
			return ResponseHelper.created( res, { 
				success: "Product created",
				id: StorageInformation._id,
				title: StorageInformation.title,
				email: StorageInformation.email,
				price: StorageInformation.price,
				stock: StorageInformation.stock
			});

		return await ResponseHelper.unprocessableEntity( res, { error: "unable to process this request, please try again" });
	}
}

export default new ProductController;