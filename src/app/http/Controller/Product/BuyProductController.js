// Repository
import repository from "../../Repository/Product/BuyProductRepository.js";

// Helper's
import UserHelper from "../../../Helpers/User/UserHelper.js";
import ResponseHelper from "../../../Helpers/ResponseHelper.js";
import AuthLoginHelper from "../../../Helpers/User/AuthLoginHelper.js";
import ProductHelper from "../../../Helpers/Product/ProductHelper.js";

// Services
import MercadoPagoServices from "../../Services/MercadoPago/MercadoPagoServices.js";

class BuyProductController {

	async BuyProduct ( req, res ) {
		const { session_id, product_id } = req.headers;
		const { quantity } = req.body;

		const SessionInformation = await AuthLoginHelper.ExistSession( session_id );

		if (! SessionInformation )
			return ResponseHelper.unprocessableEntity( res, { error: "session_id invalid" } );

		const UserInformation = await UserHelper.ExistEmail( SessionInformation.email );

		if (! UserInformation )
			return ResponseHelper.unprocessableEntity( res, { error: "email already registered" } );
	
		const ProductInformation = await ProductHelper.ExistProduct( product_id );

		if (! ProductInformation )
			return ResponseHelper.unprocessableEntity( res, { error: "product id invalid" } );

		// if ( ProductInformation.email === UserInformation.email )
		// 	return ResponseHelper.unprocessableEntity( res, { error: "você não pode comprar o produto que você mesmo criou" } );

		if ( quantity <= 0 )
			return ResponseHelper.unprocessableEntity( res, { error: "quantidade menor que 0 não é aceita" } );

		const getTheFullPrice = await ProductHelper.MultiplyThePrice( ProductInformation.price, quantity );

		const paymentInformation = await MercadoPagoServices.PaymentLinkGeneration( ProductInformation.title, getTheFullPrice, ProductInformation._id );

		if ( paymentInformation ) {
			await new repository( UserInformation.email, paymentInformation.id, UserInformation.username ).CreateBuyOrder();
		
			return ResponseHelper.unprocessableEntity( res, { success: paymentInformation.id, checkout: paymentInformation.link } );
		}
	}
}

export default new BuyProductController;