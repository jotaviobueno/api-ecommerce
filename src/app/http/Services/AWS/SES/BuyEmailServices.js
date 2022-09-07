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

export default class BuyEmailServices {
	
	// Private
	_email;
	_name;
	_product_name;
	_buy_information;

	constructor( email, name, product_name, buy_information, request_status ) {
		this._email = email;
		this._name = name;
		this._product_name = product_name;
		this._buy_information = buy_information;
		this.request_status = request_status;
	}

	async SendEmail ( ) {

		if ( this.request_status === "approved" ) {
			const params = SendEmailHelper( this._email, "Transaction confirmed!", `Hi ${this._name}, thank you for buying the ${this._product_name}, on our website, purchase information:
			product name: ${this._buy_information.title}
			total price: ${this._buy_information.unit_price}
			transacion id: ${this._buy_information.id}
			quantity: ${this._buy_information.quantity}
			payment staus: ${ this.request_status }
			`);

			try {
			
				const sendEmail = await new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail( params ).promise();

				return true;

			} catch (e) {
				console.log(e);
				return false;
			}
		}

		if ( this.request_status != "approved" ) {
			const params = SendEmailHelper( this._email, "transaction not approved!", `hey ${this._name}, your purchase attempt was unfortunately not approved, contact your card issuer and try again to make the purchase... order information:
			product name: ${this._buy_information.title}
			total price: ${this._buy_information.unit_price}
			transacion id: ${this._buy_information.id}
			quantity: ${this._buy_information.quantity}
			payment staus: ${ this.request_status }
			`);


			try {
			
				const sendEmail = await new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail( params ).promise();

				return true;

			} catch (e) {
				console.log(e);
				return false;
			}
		}
	}

}