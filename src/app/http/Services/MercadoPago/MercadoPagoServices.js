// Dependencies
import MercadoPago from "mercadopago";
import axios from "axios";

class Mercadopago {

	async PaymentLinkGeneration ( title, total ) {
		MercadoPago.configure({
			access_token: process.env.MERCADOPAGO_ACESS_TOKEN
		});
	
		const preference = {
			items: [
				{
					title: title,
					quantity: 1,
					currency_id: "BRL",
					unit_price: total
				}
			],
			notification_url: process.env.NGROK_LINK
		};
		
		return MercadoPago.preferences.create(preference).then( async (success) => {
			return success;
			
		}).catch( (e) => {
			console.log(e);
			return false;
		});
	
	}
	
	async notification ( req, res ) {
		const query = req.query;
		// const body = req.body;
		// const headers = req.headers;
	
		console.log(query);

		console.log(query["data.id"]);

		if ( query["data.id"] != null && query["data.id"] != undefined ) {
			try {
				const PaymentInformation = await axios.get(`https://api.mercadopago.com/v1/payments/${query["data.id"]}`, {
					headers: { "Authorization": `Bearer ${process.env.MERCADOPAGO_ACESS_TOKEN}` }
				});	
	
				console.log(PaymentInformation.data.status);
	
			} catch(e) {
				console.log(e);
			}
		}
	}
}

export default new Mercadopago;