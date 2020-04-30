module.exports.cadastro = function(application, request, response) {
	response.render('cadastro', {validacao: {}, dadosForm: {}, cadastroEfetuado: {}})
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

	var connection = application.config.dbConnection

	var UsuariosDAO = new application.app.models.UsuariosDAO(connection)
	var JogoDAO = new application.app.models.JogoDAO(connection)

	UsuariosDAO.inserirUsuario(dadosForm)
	JogoDAO.gerarParametros(dadosForm.usuario)
	//geração dos parâmetros

	response.render('cadastro', {validacao: {}, dadosForm: {}, cadastroEfetuado: 'sim'})
}