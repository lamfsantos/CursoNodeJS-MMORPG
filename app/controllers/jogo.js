module.exports.jogo = function(application, request, response) {
	if (request.session.autorizado) {
		response.render('jogo')
	}else{
		response.redirect('/')
	}
}