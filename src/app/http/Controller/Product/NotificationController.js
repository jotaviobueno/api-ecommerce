// Repository
import repository from "../../Repository/Product/NotificationRepository.js";

// Helper's
import UserHelper from "../../../Helpers/User/UserHelper.js";
import ResponseHelper from "../../../Helpers/ResponseHelper.js";
import AuthLoginHelper from "../../../Helpers/User/AuthLoginHelper.js";

// Services
import MercadoPagoServices from "../../Services/MercadoPago/MercadoPagoServices.js";

class NotificationController {

	async Notification ( req, res ) {
		const query = req.query;
		const id = query["data.id"];

		console.log(id);

		if ( id != null ) {
			console.log(id);
			const getPayment = await MercadoPagoServices.notification( id );

			if ( getPayment ) 
				await repository.verifyPayment( getPayment.data.additional_info.items, getPayment.data.status, id );
		} 
	}

	async PaymentHistory ( req, res ) {
		const { session_id } = req.headers;

		const SessionInformation = await AuthLoginHelper.ExistSession( session_id );

		if (! SessionInformation )
			return ResponseHelper.unprocessableEntity( res, { error: "session_id invalid" } );

		const UserInformation = await UserHelper.ExistEmail( SessionInformation.email );

		if (! UserInformation )
			return ResponseHelper.unprocessableEntity( res, { error: "email already registered" } );

		const history = await repository.getHistory( UserInformation.email );

		const a = await repository.getTransferHistory( history );

		console.log(history);
		return;

		if ( history )
			return ResponseHelper.created( res, a );

		return await ResponseHelper.unprocessableEntity( res, { error: "unable to process this request, please try again" });
	}
}

export default new NotificationController;