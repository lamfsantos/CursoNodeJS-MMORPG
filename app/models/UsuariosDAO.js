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

UsuariosDAO.prototype.autenticar = function(usuario, request, response){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("usuarios", function(error, collection){
			collection.find(usuario).toArray(function(error, result){
				if (result[0] != undefined) {
					request.session.autorizado = true

					request.session.usuario = result[0].usuario
					request.session.casa = result[0].casa
				}

				if (request.session.autorizado) {
					response.redirect('jogo')
				}else{
					response.render('index', {validacao: {}})
				}
			})
			mongoclient.close()
		})
	})
}

module.exports = function(){
	return UsuariosDAO
}