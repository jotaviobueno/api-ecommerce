// Models
import UserModel from "../../Models/User/UserModel.js";

// Dependencies

class UserHelper {

	async ExistEmail ( email ) {
		const findEmail = await UserModel.findOne({ email: email, deleted_at: null });

		if (! findEmail )
			return false;
        
		return findEmail;
	}

	async ExistCpf ( cpf ) {
		const findCpf = await UserModel.findOne({ cpf: cpf, deleted_at: null });
        
		if (! findCpf )
			return false;

		return findCpf;
	}
}

export default new UserHelper;