// Dependencies
import MercadoPago from "mercadopago";

export default async function PaymentLinkGeneration ( tittle, quantity, total ) {

	MercadoPago.configure({
		access_token: process.env.MERCADOPAGO_ACESS_TOKEN
	});
    
	var preference = {
		items: [
			{
				title: tittle,
				quantity: quantity,
				// currency_id: "ARS",
				unit_price: total
			}
		]
	};
    
	return MercadoPago.preferences.create(preference);
}