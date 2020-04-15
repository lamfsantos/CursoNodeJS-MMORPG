module.exports.index = function(application, request, response) {
	response.render('index', {validacao: {}})
}

module.exports.autenticar = function(application, request, response) {
	var dadosForm = request.body

	request.assert('usuario', 'Usuario não pode ser vazio').notEmpty()
	request.assert('senha', 'Senha não pode ser vazio').notEmpty()

	var errors = request.validationErrors()

	if (errors) {
		response.render("index", {validacao: errors})
		return
	}

	response.send('Tudo ok para criar a sessão')
}