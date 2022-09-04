// Dependencies
import MercadoPago from "mercadopago";

class Mercadopago {
	async PaymentLinkGeneration ( title, total ) {
	
		MercadoPago.configure({
			access_token: process.env.MERCADOPAGO_ACESS_TOKEN
		});
	
		var preference = {
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
		const datos = req.query;
		const body = req.body;
		const headers = req.headers;
	
		console.log(datos, body, headers);
	}
}

export default new Mercadopago;