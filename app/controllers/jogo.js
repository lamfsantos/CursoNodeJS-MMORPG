module.exports.jogo = function(application, request, response) {

	if (request.session.autorizado !== true) {
		response.redirect('/')
		return
	}

	var usuario = request.session.usuario
	var casa = request.session.casa

	var connection = application.config.dbConnection
	var JogoDAO = new application.app.models.JogoDAO(connection)

	JogoDAO.iniciaJogo(response, usuario, casa)
}

module.exports.sair = function(application, request, response) {
	request.session.destroy(function(error){
		response.render("index", {validacao: {}})
	})
}

module.exports.suditos = function(application, request, response) {
	response.render("aldeoes", {validacao: {}})
}

module.exports.pergaminhos = function(application, request, response) {
	response.render("pergaminhos", {validacao: {}})
}