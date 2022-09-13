// Models
import TransferHistoryModel from "../../../Models/Product/TransferHistoryModel.js";
import ProductModel from "../../../Models/Product/ProductModel.js";
import PaymentModel from "../../../Models/Product/PaymentModel.js";

// Services
import BuyEmailServices from "../../Services/AWS/SES/BuyEmailServices.js";

import axios from "axios";

class repository {

	async verifyPayment ( ArrayItems, status, id ) {

		await ArrayItems.forEach( async (item) => {

			if ( item.id != null ) {
				const findUser = await TransferHistoryModel.findOne({ payment_id: item.id });

				if ( findUser != null )
					if ( findUser.status === null ) {
						const findProduct = await ProductModel.findOne({ _id: item.category_id });
						const subtraction = parseFloat( findProduct.stock ) - parseFloat( 1 );
	
						await TransferHistoryModel.findOneAndUpdate({ payment_id: findUser.payment_id }, { status: status, id: id, updated_at: new Date() });

						await ProductModel.findOneAndUpdate({ _id: findProduct._id }, { stock: subtraction,  updated_at: new Date() });
									
						if ( await new BuyEmailServices( findUser.email, findUser.name, findUser.title, item, status ).SendEmail() )
							console.log( "email sent!");
						else
							console.log( "email not sent!");
					}
			}
		});
	} 

	async getTransferHistory ( transferList ) {

		console.log(transferList);

		return;





		return transferList.forEach( async (Transfer) => {

			console.log("#1");

			try {
				const findPayment = await axios.get(`https://api.mercadopago.com/v1/payments/${Transfer.id}`, {
					headers: { "Authorization": `Bearer ${process.env.MERCADOPAGO_ACESS_TOKEN}`
					}
				});

				const payer = findPayment.data.payer;
				const card = findPayment.data.card;
				const existPayment = await PaymentModel.findOne({ id: Transfer.id });

				console.log("#2");

				if ( existPayment === null ) {
					return await PaymentModel.create({
						email: Transfer.email,
						name: Transfer.username,
						quantity: 1,
						id: Transfer.id,
						payment_id: Transfer.payment_id,
    
						payment: {
							cardholder: {
								identification: { number: card.cardholder.number, type: card.cardholder.type },
								name: card.cardholder.name,
							},
							date_created: card.date_created,
							date_last_updated: card.date_last_updated,
							expiration_month: card.expiration_month,
							expiration_year: card.expiration_year,
							first_six_digits: card.first_six_digits,
							id: card.id,
							last_four_digits: card.last_four_digits
						},
						card: {
							first_name: payer.first_name,
							last_name: payer.last_name,
							email: payer.email,
							identification: { number: payer.identification.number, type: payer.identification.type },
							phone: { area_code: payer.phone.area_code, number: payer.phone.number, extension: payer.phone.extension },
							id: payer.id
						},
						created_at: new Date(),
						updated_at: new Date(),
					});
				} else {
					return existPayment;
				}
					
			} catch(e) {
				return false, console.log(e);
			}
		});
	}

	async getHistory ( email ) {
		return await TransferHistoryModel.find({ email: email }).select({ __v: 0 });
	}
}

export default new repository;