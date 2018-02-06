
/*Dependencias del proyecto*/
var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	restFul = require('express-method-override')('_method'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	request = require('request'),
	exphbs = require('express-handlebars'),
	session = require('express-session');

	/*Modulos Exportados*/
	var index = require('./routes/index');

	var app = express();

	app.engine('hbs', exphbs({
			    extname: '.hbs',
			    layoutsDir: path.join(__dirname, 'views', 'layouts'),
			    partialsDir: path.join(__dirname, 'views', 'partials'),
			    defaultLayout: 'main'})); 
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', '.hbs');



	/*Configuracion de Middlewares*/
	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev')); // registro de actividad del servidor
	app.use(bodyParser.json()); // para manejar las peticiones en formato json
	app.use(bodyParser.urlencoded({ extended: false })); //para manejar otro tipo de datos en las url como arrays
	app.use(cookieParser()); // manejo de informacion de cookies del navegador

	app.use(session({
		//secret: "clave_secreta",
		cookieName: 'wallet_session',
		secret: require('./config/secret').main,
		duration: 30 * 60 * 1000,
		activeDuration: 5 * 60 * 1000,
		resave: true,
		saveUninitialized: true
	}));

	app.use(express.static(path.join(__dirname, 'public')));
	app.use(index);

module.exports = app;
