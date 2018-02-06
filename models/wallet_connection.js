var mysql = require('mysql'),
conf = require('./db_conf'),	
	dbOptions = {
 	  user: conf.mysql.user,
	  password: conf.mysql.password,
	  host: conf.mysql.host,
	  port: conf.mysql.port,
	  database : conf.mysql.database					
 	},
	myConnection = mysql.createConnection(dbOptions)
 	
 	myConnection.connect((err) => {
 		return (err) ? console.log('Error al abrir la BD') : console.log('Conexion Establecida con MySql ')
 	})

module.exports = myConnection;
