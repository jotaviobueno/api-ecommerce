// Dependencies
import { nanoid } from "nanoid";

// Models
import LoginModel from "../../../Models/User/LoginModel.js";

export default class repository {
	// Private
	_email;
	_ip;

	constructor( email, ip ) {
		this._email = email;
		this._ip = ip;
	}

	async CreateSession ( ) {
		return await LoginModel.create({

			email: this._email,
			session_id: nanoid(),
			ip: this._ip,
			created_at: new Date(),
			disconnected_in: null,
		
		});
	}
}