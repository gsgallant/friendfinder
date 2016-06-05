// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require('path');





// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){
	app.get('/bkgrd',function(req, res){
		res.sendFile(path.join(__dirname + '/../public/assets/images/bkgrd.jpg'));
	});
	
	app.get('/survey', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

	app.use('/css',function(req, res){
		res.sendFile(path.join(__dirname + '/../public/assets/css/main.css'));
	});
	// If no matching route is found default to home
	app.use(function(req, res){
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});

}