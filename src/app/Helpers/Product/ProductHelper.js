// Models
import ProductModel from "../../Models/Product/ProductModel.js";

class ProductHelper {

	async ExistProduct ( product_id ) {
		const findProduct = await ProductModel.findOne({ _id: product_id, deleted_at: null });

		if (! findProduct )
			return false;

		return findProduct;
	}

	async MultiplyThePrice ( price, quantity ) {
		return parseFloat( quantity ) * parseFloat( price );
	}

}

export default new ProductHelper;