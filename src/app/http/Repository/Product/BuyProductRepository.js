// Dependencies

// Models
import TransferHistoryModel from "../../../Models/Product/TransferHistoryModel.js";

export default class repository {
	// Private
	_email;
	_name;
	_paymentInformation;

	constructor( email, paymentInformation, name ) {
		this._email = email;
		this._paymentInformation = paymentInformation;
		this._name = name;
	}
    
	async CreateBuyOrder ( ) {
		await this._paymentInformation.forEach( async ( information ) => {
			return await TransferHistoryModel.create({
				email: this._email,
				name: this._name,
				description: information.title,
				status: null,
				payment_id: information.id,
				total_price: information.unit_price,
				created_at: new Date(),
				updated_at: new Date(),
			});
		});

	}
}