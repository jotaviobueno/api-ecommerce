// Dependencies
import bcrypt from "bcrypt";

// Models
import UserModel from "../../../Models/User/UserModel.js";

export default class repository {
	// Private
	_username;
	_email;
	_cpf;
	_password;
    
	constructor( username, email, cpf, password ) {
		this._username = username;
		this._email = email;
		this._cpf = cpf;
		this._password = password;
	}

	async Storage (  ) {
		return await UserModel.create({

			username: this._username,
			email: this._email,
			password: await bcrypt.hash( this._password, 10 ),
			cpf: this._cpf,
			role: 0,
			created_at: new Date(),
			updated_at: new Date(),
			deleted_at: null
			
		});
	}
}