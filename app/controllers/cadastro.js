module.exports.cadastro = function(application, request, response) {
	response.render('cadastro', {validacao: {}, dadosForm: {}})
}

module.exports.cadastrar = function(application, request, response) {
	var dadosForm = request.body
	request.assert('nome', 'Nome não pode ser vazio').notEmpty()
	request.assert('usuario', 'Usuário não pode ser vazio').notEmpty()
	request.assert('senha', 'Senha não pode ser vazio').notEmpty()
	request.assert('casa', 'Casa não pode ser vazio').notEmpty()

	var errors = request.validationErrors()

	if (errors) {
		response.render('cadastro', {validacao: errors, dadosForm: dadosForm})
		return
	}

	response.send("Podemos cadastrar")
}