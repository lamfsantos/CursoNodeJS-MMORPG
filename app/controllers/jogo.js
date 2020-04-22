module.exports.jogo = function(application, request, response) {

	if (request.session.autorizado !== true) {
		response.redirect('/')
		return
	}

	var msg = ''

	if (request.query.msg != '') {
		msg = request.query.msg
	}

	var usuario = request.session.usuario
	var casa = request.session.casa

	var connection = application.config.dbConnection
	var JogoDAO = new application.app.models.JogoDAO(connection)

	JogoDAO.iniciaJogo(response, usuario, casa, msg)
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

	var connection = application.config.dbConnection
	var JogoDAO = new application.app.models.JogoDAO(connection)

	var usuario = request.session.usuario

	JogoDAO.getAcoes(usuario)

	response.render("pergaminhos", {validacao: {}})
}

module.exports.ordenar_acao_sudito = function(application, request, response) {
	var dadosForm = request.body

	request.assert('acao', 'Ação deve ser informada').notEmpty()
	request.assert('quantidade', 'Quantidade deve ser informada').notEmpty()

	var errors = request.validationErrors()

	if(errors){
		response.redirect('jogo?msg=A')
		return
	}	

	var connection = application.config.dbConnection
	var JogoDAO = new application.app.models.JogoDAO(connection)

	dadosForm.usuario = request.session.usuario
	JogoDAO.acao(dadosForm)

	response.redirect('jogo?msg=B')
}