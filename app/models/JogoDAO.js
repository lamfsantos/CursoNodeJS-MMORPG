function JogoDAO(connection) {
	this._connection = connection()
}

JogoDAO.prototype.gerarParametros = function(usuario) {
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("jogo", function(error, collection){
			collection.insert({
				usuario: usuario,
				moeda: 15,
				suditos: 10,
				temor: Math.floor(Math.random() * 1000),
				sabedoria: Math.floor(Math.random() * 1000),
				comercio: Math.floor(Math.random() * 1000),
				magia: Math.floor(Math.random() * 1000)
			})
			mongoclient.close()
		})
	})
}

JogoDAO.prototype.iniciaJogo = function(response, usuario, casa, msg) {
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("jogo", function(error, collection){
			collection.find({usuario: usuario}).toArray(function(error, result){
				response.render('jogo', {img_casa: casa, jogo: result[0], msg: msg})
			})
			mongoclient.close()
		})
	})
}

JogoDAO.prototype.acao = function(acao) {
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("acao", function(error, collection){
			var date = new Date()

			var tempo = null

			switch(parseInt(acao.acao)){
				case 1: 
					tempo = 1 * 60 * 60000
					break
				case 2: 
					tempo = 2 * 60 * 60000
					break
				case 3: 
					tempo = 5 * 60 * 60000
					break
				case 4: 
					tempo = 5 * 60 * 60000
					break
			}

			acao.acao_termina_em = date.getTime() + tempo
			collection.insert(acao)
			mongoclient.close()
		})
	})
}

JogoDAO.prototype.getAcoes = function(usuario, response) {
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("acao", function(error, collection){
			collection.find({usuario: usuario}).toArray(function(error, result){
				response.render("pergaminhos", {acoes: result})
			})
			mongoclient.close()
		})
	})
}

module.exports = function(){
	return JogoDAO
}