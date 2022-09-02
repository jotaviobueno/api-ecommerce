// Dependencies
import mongoose from "mongoose";

export async function Connect () {

	return await mongoose.connect( process.env.DB_LINK ).then( () => {
		console.log( "connected to mongoose" );

		return true;
    
	}).catch( (e) => {
		throw (e);
	});
}