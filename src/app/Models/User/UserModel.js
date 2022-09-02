// Dependencies
import mongoose from "mongoose";

// Model
const UserModel = mongoose.model( "user", {

	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	cpf: { type: Number, required: true },
	role: { type: Number, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
	deleted_at: { type: Date }
    
});

export default UserModel;