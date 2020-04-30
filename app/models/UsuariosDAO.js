//Importando o módulo do crypto
var crypto = require("crypto")

function UsuariosDAO(connection) {
	this._connection = connection()
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("usuarios", function(error, collection){
			var senha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex")
			usuario.senha = senha_criptografada
			collection.insert(usuario)
			mongoclient.close()
		})
	})
}

UsuariosDAO.prototype.autenticar = function(usuario, request, response){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("usuarios", function(error, collection){

			var senha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex")
			usuario.senha = senha_criptografada

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