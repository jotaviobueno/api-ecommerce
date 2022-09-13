// Dependencies
import mongoose from "mongoose";

// Model
const PaymentModel = mongoose.model( "PaymentModel", {

	email: { type: String, required: true },
	name: { type: String, require: true },
	quantity: { type: Number },
	id: { type: String },
	payment_id: { type: String, required: true },
    
	payment: {
		cardholder: {
			identification: { number: { type: String }, type: { type: String } },
			name: { type: String },
		},
		date_created: { type: String },
		date_last_updated: { type: String },
		expiration_month: { type: Number },
		expiration_year: { type: Number },
		first_six_digits: { type: String },
		id: { type: String },
		last_four_digits: { type: String }
	},
	card: {
		first_name: { type: String },
		last_name: { type: String },
		email: { type: String },
		identification: { number: { type: String }, type: { type: String } },
		phone: { area_code: { type: Number }, number: { type: Number }, extension: { type: Number } },
		id: { type: String }
	},
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
});

export default PaymentModel;