module.exports.jogo = function(application, request, response) {
	if (request.session.autorizado) {
		response.render('jogo', {img_casa: request.session.casa})
	}else{
		response.redirect('/')
	}
}

module.exports.sair = function(application, request, response) {
	request.session.destroy(function(error){
		response.render("index", {validacao: {}})
	})
}