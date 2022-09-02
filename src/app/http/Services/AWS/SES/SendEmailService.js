// Dependencies
import AWS from "aws-sdk";

// Helper
import SendEmailHelper from "../../../../Helpers/AWSSESHelper.js";

// Config
AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: "us-east-1",
	s3BucketEndpoint: false,
});

export default class SendMessageService {
	
	// Private
	_email;
	_name;
	_ip;

	constructor( email, name, ip ) {
		this._email = email;
		this._name = name;
		this._ip = ip;
	}

	async Welcome ( ) {
		const params = SendEmailHelper( this._email, "Welcome to ECOMMERCE!", `Hello ${this._name}, nice to meet you, welcome to ECOMMERCE a 100% free platform to see ANYTHING YOU WANT...`);

		try {
			
			const test = await new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail( params ).promise();
			console.log(test);

		} catch (e) {
			return false;
		}
	}

	async Login ( ) {
		const params = SendEmailHelper( this._email, "New login detected!", `Hey ${this._name}, we detected a new login, based on ip: ${this._ip}.`);

		try {
			
			const test = await new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail( params ).promise();
			console.log(test);

		} catch (e) {
			return false;
		}
	}
}