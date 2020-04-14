module.exports = function(application){
	application.get('/cadastro', function(request, response){
		application.app.controllers.cadastro.cadastro(application, request, response)
	});
}