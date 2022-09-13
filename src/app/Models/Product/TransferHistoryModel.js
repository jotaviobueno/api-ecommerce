// Dependencies
import mongoose from "mongoose";

// Model
const TransferHistoryModel = mongoose.model( "transfer", {

	email: { type: String, required: true },
	name: { type: String, require: true },
	description: { type: String, required: true },
	status: { type: String },
	quantity: { type: Number },
	id: { type: String },
	payment_id: { type: String, required: true },
	total_price: { type: Number, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default TransferHistoryModel;