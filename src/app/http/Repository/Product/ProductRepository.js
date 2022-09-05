// Dependencies

// Models
import ProductModel from "../../../Models/Product/ProductModel.js";

export default class repository {
	// Private
	_name;
	_email;
	_stock;

	constructor( email, name, title, price, stock) {
		this._email = email;
		this._name = name;
		this.title = title;
		this.price = price;
		this._stock = stock;
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

}