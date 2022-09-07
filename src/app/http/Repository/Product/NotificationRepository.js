// Models
import TransferHistoryModel from "../../../Models/Product/TransferHistoryModel.js";

// Services
import BuyEmailServices from "../../Services/AWS/SES/BuyEmailServices.js";

class repository {

	async verifyPayment ( ArrayItems, status ) {

		ArrayItems.forEach( async (item) => {

			if ( item.id != null ) { 
				const findUser = await TransferHistoryModel.findOne({ payment_id: item.id });

				if ( findUser != null )
					if ( findUser.status != "approved" ) {

						await TransferHistoryModel.findOneAndUpdate({ id: findUser._id }, { status: status, updated_at: new Date() });

						if ( await new BuyEmailServices( findUser.email, findUser.name, findUser.title, item, status ).SendEmail() )
							console.log( "email sent!" );
						else
							console.log( "email not sent!" );
					}
			}
		});
	} 
}

export default new repository;