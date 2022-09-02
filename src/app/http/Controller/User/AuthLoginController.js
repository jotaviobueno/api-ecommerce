// Repository
import repository from "../../Repository/User/AuthLoginRepository.js";

// Helper's
import UserHelper from "../../../Helpers/User/UserHelper.js";
import AuthLoginHelper from "../../../Helpers/User/AuthLoginHelper.js";
import ResponseHelper from "../../../Helpers/ResponseHelper.js";

// Services
import SendEmailService from "../../Services/AWS/SES/SendEmailService.js";

class AuthLoginController {

	async CreateSession ( req, res ) {
		const { email, password } = req.body;
		const AddressIP = AuthLoginHelper.GetIp();

		const UserInformation = await UserHelper.ExistEmail( email );

		if (! UserInformation )
			return ResponseHelper.unprocessableEntity( res, { error: "email already registered" } );

		if (! await UserHelper.ExistCpf( UserInformation.cpf ) )
			return ResponseHelper.unprocessableEntity( res, { error: "cpf already registered" } );

		if (! await AuthLoginHelper.ComparePassword( password, UserInformation.password ) )
			return ResponseHelper.notAuthorized( res, { error:  "not authorized" } );

		await AuthLoginHelper.VerifyUserSession( UserInformation.email );

		const SessionInformation = await new repository( email, AddressIP ).CreateSession();

		if ( SessionInformation ) {
			if (! await AuthLoginHelper.VerifyUserIp( UserInformation.email, AddressIP ) )
				if ( await new SendEmailService( UserInformation.email, UserInformation.username, AddressIP ).Login() === false )
					console.log( "email not sent!" );

			return ResponseHelper.created( res, { 

				success:  "Session created",
				session_id: SessionInformation.session_id,
				username: UserInformation.username,
				email: SessionInformation.email
            
			}); 
		}

		return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" });
	}
}

export default new AuthLoginController;