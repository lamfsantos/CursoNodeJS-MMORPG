module.exports = function(application){
	application.get('/jogo', function(request, response){
		application.app.controllers.jogo.jogo(application, request, response)
	});
	application.get('/sair', function(request, response){
		application.app.controllers.jogo.sair(application, request, response)
	});
}