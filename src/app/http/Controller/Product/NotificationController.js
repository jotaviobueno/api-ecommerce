// Repository
import repository from "../../Repository/Product/NotificationRepository.js";

// Services
import MercadoPagoServices from "../../Services/MercadoPago/MercadoPagoServices.js";

class NotificationController {

	async Notification ( req, res ) {
		const query = req.query;
		const id = query["data.id"];

		if ( id != null ) {
			const getPayment = await MercadoPagoServices.notification( id );
			
			if ( getPayment ) 
				await repository.verifyPayment( getPayment.data.additional_info.items, getPayment.data.status );
		} 
	}
}

export default new NotificationController;