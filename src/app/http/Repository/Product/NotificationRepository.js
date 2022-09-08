// Models
import TransferHistoryModel from "../../../Models/Product/TransferHistoryModel.js";
import ProductModel from "../../../Models/Product/ProductModel.js";

// Services
import BuyEmailServices from "../../Services/AWS/SES/BuyEmailServices.js";

class repository {

	async verifyPayment ( ArrayItems, status, id ) {

		await ArrayItems.forEach( async (item) => {

			if ( item.id != null ) {
				const findUser = await TransferHistoryModel.findOne({ payment_id: item.id });

				if ( findUser != null )
					if ( findUser.status === null ) {
						const findProduct = await ProductModel.findOne({ _id: item.category_id });
						const subtraction = parseFloat( findProduct.stock ) - parseFloat( 1 );
	
						await TransferHistoryModel.findOneAndUpdate({ payment_id: findUser.payment_id }, { status: status, id: id, updated_at: new Date() });

						await ProductModel.findOneAndUpdate({ _id: findProduct._id }, { stock: subtraction,  updated_at: new Date() });
									
						if ( await new BuyEmailServices( findUser.email, findUser.name, findUser.title, item, status ).SendEmail() )
							console.log( "email sent!");
						else
							console.log( "email not sent!");
					}
			}
		});
	} 

	async getHistory ( email ) {
		return await TransferHistoryModel.find({ email: email }).select({ __v: 0 });
	}
}

export default new repository;