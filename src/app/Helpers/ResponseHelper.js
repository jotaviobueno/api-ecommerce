class ResponseHelper {

	success ( res, content ) {
		return res.status(200).json( content );
	}
  
	created ( res, content ) {
		return res.status(201).json( content );
	}
  
	noContent ( res ) {
		return res.status(204);
	}
  
	badRequest ( res, content ) {
		return res.status(400).json( content );
	}
  
	notAuthorized ( res, content ) {
		return res.status(401).json( content );
	}
  
	notFound ( res, content ) {
		return res.status(404).json( content );
	}
    
	unprocessableEntity ( res, content ) {
		return res.status(422).json( content );
	}
}
export default new ResponseHelper();