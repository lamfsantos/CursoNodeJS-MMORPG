module.exports.jogo = function(application, request, response) {
	if (request.session.autorizado) {
		response.render('jogo')
	}else{
		response.redirect('/')
	}
}

module.exports.sair = function(application, request, response) {
	request.session.destroy(function(error){
		response.render("index", {validacao: {}})
	})
}