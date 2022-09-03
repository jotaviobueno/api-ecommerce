// Dependencies
import mongoose from "mongoose";

// Model
const ProductModel = mongoose.model( "product", {

	tittle: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	stock: { type: Number, required: true },
	price: { type: Number, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
	deleted_at: { type: Date }
    
});

export default ProductModel;