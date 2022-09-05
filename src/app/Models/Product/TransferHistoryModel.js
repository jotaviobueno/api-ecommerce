// Dependencies
import mongoose from "mongoose";

// Model
const TransferHistoryModel = mongoose.model( "transferHistory", {

	email: { type: String, required: true },
	description: { type: String, required: true },
	status: { type: String },
	payment_id: { type: String, required: true },
	total_price: { type: Number, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default TransferHistoryModel;