// Dependencies
import mongoose from "mongoose";

// Model
const LoginModel = mongoose.model( "Login", {
    
	email: { type: String, required: true },
	session_id: { type: String, required: true },
	ip: { type: String, required: true },
	created_at: { type: Date, required: true },
	disconnected_in: { type: Date },
    
});

export default LoginModel;
