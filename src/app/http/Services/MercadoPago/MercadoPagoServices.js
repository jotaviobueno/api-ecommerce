// Dependencies
import MercadoPago from "mercadopago";
import axios from "axios";
import { nanoid } from "nanoid";

class Mercadopago {

	async PaymentLinkGeneration ( title, total, _id ) {
		MercadoPago.configure({
			access_token: process.env.MERCADOPAGO_ACESS_TOKEN
		});
	
		const preference = {
			items: [
				{	
					id: nanoid(),
					title: title,
					quantity: 1,
					category_id: _id.toString(),
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