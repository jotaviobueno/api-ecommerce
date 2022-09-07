// Dependencies
import MercadoPago from "mercadopago";
import axios from "axios";
import { nanoid } from "nanoid";

class Mercadopago {

	async PaymentLinkGeneration ( title, total ) {
		MercadoPago.configure({
			access_token: process.env.MERCADOPAGO_ACESS_TOKEN
		});
	
		const preference = {
			items: [
				{	
					id: nanoid(),
					title: title,
					quantity: 1,
					currency_id: "BRL",
					unit_price: total
				}
			],
			notification_url: process.env.NGROK_LINK
		};
		
		try {
			const Information = await MercadoPago.preferences.create(preference);

			return {
				id: Information.body.items, 
				link: Information.body.sandbox_init_point
			};

		} catch (e) {
			console.log(e);
			return false;
		}
	}
	
	// async notification ( req ) {
	// 	const query = req.query;

	// 	if ( query["data.id"] != null ) {
	// 		try {
	// 			const PaymentInformation = await axios.get(`https://api.mercadopago.com/v1/payments/${query["data.id"]}`, {
	// 				headers: { "Authorization": `Bearer ${process.env.MERCADOPAGO_ACESS_TOKEN}` }
	// 			});	

	// 			// console.log( PaymentInformation.data.status );

	// 			if ( PaymentInformation.data.status ) {

	// 				PaymentInformation.data.additional_info.items.forEach( async ( paymentInformation ) => {

	// 					const getPaymentInformation = await TransferHistoryModel.findOne({ payment_id: paymentInformation.id });

	// 					if ( getPaymentInformation.status === null ) {
	// 						if ( paymentInformation.id != null ) { 
	// 							await TransferHistoryModel.findOneAndUpdate({ payment_id: paymentInformation.id }, { status: PaymentInformation.data.status, updated_at: new Date() });

	// 							if (! await new BuyEmailServices( getPaymentInformation.email, getPaymentInformation.name, paymentInformation.title, paymentInformation, PaymentInformation.data.status ).SendEmail() )
	// 								console.log( "email not sent!" );
	// 						}
	// 					}
	// 				});
	// 			}

	// 		} catch(e) {
	// 			return false, console.log(e);
	// 		}
	// 	}
	// }

	async notification ( id ) {

		try {

			return await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
				headers: { "Authorization": `Bearer ${process.env.MERCADOPAGO_ACESS_TOKEN}` }
			});	

		} catch(e) {
			return false, console.log(e);
		}
	}
}

export default new Mercadopago;