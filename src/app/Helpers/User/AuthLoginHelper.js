// Models
import LoginModel from "../../Models/User/LoginModel.js";

// Dependencies
import bcrypt from "bcrypt";
import ip from "ip";

// Config
import {LoginsNumber} from "../../../config/Config.js";

class AuthLoginHelper {

	async ExistSession ( session_id ) {
		const findSession = await LoginModel.findOne({ session_id: session_id, disconnected_in: null });

		if (! findSession )
			return false;

		return findSession;
	}

	async ComparePassword ( password, hash ) {
		return await bcrypt.hash( password, hash );
	}

	GetIp ( ) {
		return ip.address();
	}

	async VerifyUserSession ( email ) {
		const FindSession = await LoginModel.find( { email: email, disconnected_in: null } );

		if ( FindSession.length >= LoginsNumber ) {
			FindSession.forEach( async (Session) => {
				await LoginModel.findOneAndUpdate( { email: Session.email, disconnected_in: null }, { disconnected_in: new Date() } );
				
			});
		}
	}

	async VerifyUserIp ( email, ip ) {
		const findSession = await LoginModel.find({ email: email, disconnected_in: null });

		if ( findSession.ip != ip )
			return false;

		return true;
	}
}

export default new AuthLoginHelper;