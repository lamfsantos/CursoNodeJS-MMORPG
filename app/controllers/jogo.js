module.exports.jogo = function(application, request, response) {

	if (request.session.autorizado !== true) {
		response.redirect('/')
		return
	}

	var comando_invalido = 'N'

	if (request.query.comando_invalido == 'S') {
		comando_invalido = 'S'
	}

	console.log(comando_invalido)

	var usuario = request.session.usuario
	var casa = request.session.casa

	var connection = application.config.dbConnection
	var JogoDAO = new application.app.models.JogoDAO(connection)

	JogoDAO.iniciaJogo(response, usuario, casa, comando_invalido)
}

module.exports.sair = function(application, request, response) {
	request.session.destroy(function(error){
		response.render("index", {validacao: {}})
	})
}

module.exports.suditos = function(application, request, response) {
	if (request.session.autorizado !== true) {
		response.redirect('/')
		return
	}
	response.render("aldeoes", {validacao: {}})
}

module.exports.pergaminhos = function(application, request, response) {
	if (request.session.autorizado !== true) {
		response.redirect('/')
		return
	}
	response.render("pergaminhos", {validacao: {}})
}

module.exports.ordenar_acao_sudito = function(application, request, response) {
	var dadosForm = request.body

	request.assert('acao', 'Ação deve ser informada').notEmpty()
	request.assert('quantidade', 'Quantidade deve ser informada').notEmpty()

	var errors = request.validationErrors()

	if(errors){
		response.redirect('jogo?comando_invalido=S')
		return
	}	

	console.log(dadosForm)
	response.send('tudo ok')
}