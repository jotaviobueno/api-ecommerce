// Dependencies

// Models
import ProductModel from "../../../Models/Product/ProductModel.js";

export default class repository {
	// Private
	_name;
	_email;
	_stock;
	_id;

	constructor( email, name, title, price, stock, product_id ) {
		this._email = email;
		this._name = name;
		this.title = title;
		this.price = price;
		this._stock = stock;
		this._id = product_id;
	}
    
	async StorageProduct ( ) {
		return await ProductModel.create({
			title: this.title,
			name: this._name,
			email: this._email,
			stock: this._stock,
			price: this.price,
			created_at: new Date(),
			updated_at: new Date(),
			deleted_at: null
		});
	}

	async DeleteProduct ( ) {
		return await ProductModel.findOneAndUpdate({ _id: this._id }, { deleted_at: new Date(), updated_at: new Date() });
	}

	async FindAll ( ) {
		return await ProductModel.find({ deleted_at: null }).select({ deleted_at: 0, __v: 0 });
	}
}