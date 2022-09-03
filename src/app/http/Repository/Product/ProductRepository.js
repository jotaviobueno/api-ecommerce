// Dependencies

// Models
import ProductModel from "../../../Models/Product/ProductModel.js";

export default class repository {
	// Private
	_name;
	_email;
	_stock;

	constructor( email, name, tittle, price, stock) {
		this._email = email;
		this._name = name;
		this.tittle = tittle;
		this.price = price;
		this._stock = stock;
	}
    
	async StorageProduct ( ) {

		return await ProductModel.create({
			tittle: this.tittle,
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