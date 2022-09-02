// Repository
import repository from "../../Repository/User/UserRepository.js";

// Helper's
import UserHelper from "../../../Helpers/User/UserHelper.js";
import ResponseHelper from "../../../Helpers/ResponseHelper.js";

// Services
import SendEmailService from "../../Services/AWS/SES/SendEmailService.js";

class UserController {
    
	async Storage ( req, res ) {
		const { username, email, cpf, password } = req.body;

		if ( await UserHelper.ExistEmail( email ) )
			return ResponseHelper.unprocessableEntity( res, { error: "email exist" });

		if ( await UserHelper.ExistCpf( cpf ) )
			return ResponseHelper.unprocessableEntity( res, { error: "cpf exist" });
		
		const StorageInformation = await new repository( username, email, cpf, password ).Storage( );

		if ( StorageInformation ) {
			await new SendEmailService( email, username ).Welcome( );

			return ResponseHelper.created( res, { 
				success: "account created",
				username: StorageInformation.email,
				email: StorageInformation.email,
				cpf: StorageInformation.cpf,
				created_at: StorageInformation.created_at,
			});
		}

		return await ResponseHelper.unprocessableEntity( res, { error: "unable to process this request, please try again" });
	}

}

export default new UserController;