module.exports = function(application){
	application.get('/jogo', function(request, response){
		application.app.controllers.jogo.jogo(application, request, response)
	});
	application.get('/sair', function(request, response){
		application.app.controllers.jogo.sair(application, request, response)
	});
	application.get('/suditos', function(request, response){
		application.app.controllers.jogo.suditos(application, request, response)
	});
	application.get('/pergaminhos', function(request, response){
		application.app.controllers.jogo.pergaminhos(application, request, response)
	});
	application.post('/ordenar_acao_sudito', function(request, response){
		application.app.controllers.jogo.ordenar_acao_sudito(application, request, response)
	});
}