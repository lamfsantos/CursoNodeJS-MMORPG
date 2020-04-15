function UsuariosDAO(connection) {
	this._connection = connection()
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("usuarios", function(error, collection){
			collection.insert(usuario)
			mongoclient.close()
		})
	})
}

module.exports = function(){
	return UsuariosDAO
}