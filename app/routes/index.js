module.exports = function(application){
	application.get('/', function(request, response){
		application.app.controllers.index.index(application, request, response)
	});
}