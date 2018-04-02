'use strict'
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log(web3.eth.syncing);

var WalletRequest = require('./wallet_request');
var WalletModel = require('../models/wallet_model'),
	
	WalletController = () => {
		//creacion de un protitipo
	}

	WalletController.registrer = (req, res, next) => {
					
		if(req.body.signup_name && req.body.signup_email && req.body.signup_password){

			//verifico que el usuario no se encuentre registrado
			WalletModel.validate_email(req.body.signup_email, (err, rows) => {
				//console.log(err,'---',rows)
				if(err){
					let locals = {
						alert_message : "Error al consultar el registro a la BD",
						alert_status : 'show'
					}
					console.log(locals)
					res.render('index', locals)
				}
				else{
					if(rows.length == 0){

						//realizo la consulta a la API
						var acc = web3.personal.newAccount('12345678');
						web3.eth.contract();
    					//web3.eth.personal.importRawKey(pkey,password);
						console.log(acc);
						/*WalletRequest.request_create({email : req.body.signup_email,
						password : req.body.signup_password} , (err, response, body) => {
						
							/*if(err){
					  			let locals = {
									title : "Error en la conexion con la URL",
									descripcion : "Compruebe su conexion de red",
									alert_status : true,
									tipo : "alert alert-danger"
								}
								console.log(locals)
								res.render('index', locals)										
					  		}
					  		else{
					  			console.log(body)
					  			var resul = JSON.parse(body);
					  			console.log(resul)	*/

					  			if(acc){
					  				let usuario = {
										address : acc,
										privateKey : "",
										correo : req.body.signup_email,
										password : req.body.signup_password,
									}	

									console.log(usuario)

									//realizo la insercion de los datos del usuario y la wallet
									WalletModel.insert_user(usuario, (err) => {
										if(err){

											let locals = {
												alert_message : "Error al consultar el registro a la BD",
												alert_status : 'show'
											}						
											console.log(locals)
											res.render('index', locals)
										}
										else{
											//se obtienen los datos del usuario registrado
											WalletModel.get_user_by_email(req.body.signup_email, (err, rows) => {

												if(err){
													let locals = {
														alert_message : "Error en la comunicacion con la BD",
														alert_status : true
													}
													console.log(locals)
													res.render('index', locals)
												}
												else{
													if(rows.length > 0){
														var datos = rows[0];
														req.session.nombre = datos.nombre;
														req.session.id_usuario = datos.id_usuario;
														req.session.address = datos.address;
														req.session.bitcoin = "0.00000000";
														req.session.alert_message = "";
														req.session.alert_status = '';
														req.session.login = true;
														res.redirect('dashboard');
													}
												}
											})
										}
									})
					  			}
					  			else{
					  				console.log("faltan variables");
					  				let locals = {
										alert_message : "Error de Sintaxis en la consulta HTTP",
										alert_status : true
									}
									console.log(locals)
									res.render('index', locals)	
					  			}
					  			
					  		}
				    	//});/**/
					else{
						let locals = {
							alert_message : "El email ya se encuentra registrado",
							alert_status : 'show'
						}
						console.log(locals)
						res.render('index', locals)
					}	
				}
			})
		}
		else{
			let locals = {
				alert_message : "Debe ingresar todos los datos del formulario",
				alert_status : 'show'
			}
				console.log(locals)
				res.render('index', locals)
		}/**/
	}

	WalletController.login = (req, res, next) => {
		if(req.body.signin_email && req.body.signin_password){
			let datos = [req.body.signin_email,
						req.body.signin_password]
			
			console.log(datos)

			WalletModel.login(datos, (err, rows) => {
				console.log(err,'---',rows)
				console.log(rows.length)
				if(err){
					let locals = {
						alert_message : "Error al consultar el registro a la BD",
						alert_status : 'show'
					}
					console.log(locals)
					res.render('index', locals)
				}
				else{
					if(rows.length == 0){
						let locals = {
							alert_message : "combinacion email/password no coinciden",
							alert_status : 'show'
						}
						console.log(locals)
						res.render('index', locals)
					}
					else{
						
						datos = rows[0];
						//req.session.nombre = datos.nombre;
						/*req.session.id_usuario = datos.id;
						req.session.address = datos.address;
						req.session.alert_message = "";
						req.session.alert_status = '';
						req.session.login = true;
		  				res.redirect('dashboard');*/

		  				console.log("consultado el saldo del usuario --> ")
		  				var balance = web3.eth.getBalance(rows[0].address);
						/*WalletRequest.request_balance((err, response, body) => {
						/*	if(err){
					  			let locals = {
									alert_message : "Compruebe su conexion de red",
									alert_status : 'show',
								}
								console.log(locals)
								res.render('index', locals)		
					  		}
					  		else{
					  			var resul = JSON.parse(body);
					  			console.log(resul)
					  			
					  			if(!resul.status){
					  				datos = rows[0];*/
									//req.session.nombre = datos.nombre;
									
									req.session.id_usuario = datos.id;
									req.session.address = datos.address;
									req.session.login = true;
									req.session.alert_message = "";
									req.session.alert_status = '';
					  				res.redirect('dashboard');
					  			/*}
					  			else{
					  				console.log("faltan variables");
					  				let locals = {
										alert_message : "Error de Sintaxis en la consulta HTTP",
										alert_status : 'show',
									}
									console.log(locals)
									res.render('index', locals)	
					  			}
							}
							
						*///})/**/
					}
				}
			})
		}
		else{
			let locals = {
				alert_message : "Debe ingresar todos los datos del formulario",
				alert_status : 'show'
			}
			console.log(locals)
			res.render('index', locals)
		}
	}

	WalletController.send = (req, res, next) => {

		var ruta = req.body.ruta;
		//realizo la consulta a la URL de la API
		var fine = web3.personal.unlockAccount(req.body.from,'12345678');

		if(!web3.isAddress(req.body.recipient))
		{
				req.session.alert_message = 'Error en la transaccion';
				req.session.alert_status = 'show';
				console.log('Error en la transaccion');
				res.redirect(ruta)		
	  		}	
		
		if(fine)
		web3.eth.sendTransaction({
				from: req.body.from,
    			to: req.body.recipient,
    			value: web3.toWei(req.body.quantity, 'ether'),
    			gas : req.body.gasli,
                gasPrice: web3.toWei(req.body.gaspr, "gwei")
    		}, 
    		function(err,transactionHash){
  			if(!err)
    		{	
    			console.log(transactionHash); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
	  			var fee =  req.body.gasli * web3.fromWei(req.body.gaspr,"gwei");
	  			console.log("fee : "+fee)
	  				let payment = {
	  					de : req.body.from,
						para : req.body.recipient,
						hash: transactionHash,
						value :  web3.fromWei(web3.toWei(req.body.quantity, 'ether'),"ether"),
					}

					console.log(payment)

					WalletModel.insert_transaction(payment, (err) => {
						if(err){
							req.session.alert_message = 'Error en la comunicacion con la BD';
							req.session.alert_status = 'show';				
							console.log(err)
							res.redirect(ruta);	
						}
						else{
							req.session.alert_message = "exito";
							req.session.alert_status = 'show';	
							console.log("Transaccion Aprobada y Registrada en BD")
							res.redirect(ruta);	
						}
					})
    		}
    		else 
    			{
				req.session.alert_message = 'Error en la transaccion';
				req.session.alert_status = 'show';

				console.log(err)
				res.redirect(ruta)		
	  		}

		});
		/*WalletRequest.request_send({address : req.body.recipient,
					mount : req.body.quantity,
					fee : req.body.comision} , (err, response, body) => {

			if(err){
				req.session.alert_message = 'Compruebe su conexion de red';
				req.session.alert_status = 'show';

				console.log(err)
				res.redirect(ruta)		
	  		}
	  		else{
	  			console.log(body)
	  			var resul = JSON.parse(body);
	  			console.log(resul)
	  			

	  			if(resul.status){
	  				let payment = {
						para : req.body.recipient,
						cantidad : req.body.quantity,
						descripcion : req.body.message,
						fee : req.body.comision,
						status : resul.message,
						id_currency: 1,
						id_usuario : req.session.id_usuario
					}

					console.log(payment)

					WalletModel.insert_transaction(payment, (err) => {
						if(err){
							req.session.alert_message = 'Error en la comunicacion con la BD';
							req.session.alert_status = 'show';				
							console.log(err)
							res.redirect(ruta);	
						}
						else{
							req.session.alert_message = resul.message;
							req.session.alert_status = 'show';	
							console.log("Transaccion Aprobada y Registrada en BD")
							res.redirect(ruta);	
						}
					})
	  			}
	  			else{
	  				console.log("faltan variables");
					req.session.alert_message = 'Error de Sintaxis en la consulta HTTP';
					req.session.alert_status = 'show';	
					res.redirect(ruta);	
	  			}		
	  		}
    	})*/
	}

	WalletController.request_newaddress = (req, res, next) => {
		//realizo la consulta a la API
		WalletRequest.request_newaddress((err, response, body) => {
			if(err){
				req.session.alert_message = 'Compruebe su conexion de red';
				req.session.alert_status = 'show';	
				console.log(err)
				res.redirect('/addresses');				
	  		}
	  		else{
	  			console.log(body)
	  			var resul = JSON.parse(body);
	  			console.log(resul)

	  			if(!resul.status){
	  				let direccion = {
						id_usuario : req.session.id_usuario,
						direccion : resul.address,
						label : resul.label,
						saldo : 0,
						id_status : 1,
						id_currency: 1
					}

					console.log(direccion)

					WalletModel.insert_address(direccion, (err) => {
						if(err){				
							console.log(err)
							req.session.alert_message = 'Error en la comunicacion con la BD';
							req.session.alert_status = 'show';	
							res.redirect('addresses');	
						}
						else{
							console.log("Nueva direccion creada")	
							req.session.alert_message = 'Nueva direccion creada';
							req.session.alert_status = 'show';	
							res.redirect('addresses');	
						}
					})
	  			}
	  			else{
	  				console.log("faltan variables");
					req.session.alert_message = 'Error de Sintaxis en la consulta HTTP';
					req.session.alert_status = 'show';
					res.redirect('addresses');	
	  			}	/**/		
	  		}
    	})  
	}

	WalletController.get_index = (req, res, next) => res.render('index', { titulo: "Tu Billetera" });

	WalletController.get_dashboard = (req, res, next) => {
		if(req.session.login){
	      	WalletModel.get_all_transactions(req.session.address, (err, rows) => {
				if(err){
					console.log(err);
					res.render('dashboard', { titulo: "Panel de Usuario", 
					//nombre : req.session.nombre,
					address : req.session.address,
					bitcoin : req.session.bitcoin,
					activa : "dashboard",
					alert_message : 'Error en la comunicacion con la BD',
					alert_status : 'show',
					dashboard : "active"});	

					req.session.alert_status = "";
					req.session.alert_message = "";
				}
				else{					
					res.render('dashboard', { titulo: "Panel de Usuario", 
					//nombre : req.session.nombre,
					address : req.session.address,
					//bitcoin : req.session.bitcoin,
					transacciones : rows,
					accounts:web3.eth.accounts,
					activa : "dashboard",
					alert_message : req.session.alert_message,
					alert_status : req.session.alert_status,
					dashboard : "active"});	

					req.session.alert_status = "";
					req.session.alert_message = "";
				}
			})
		} else {
	      let locals = {
					alert_message : "Su sesion a finalizado",
					alert_status : 'show',
				}
				console.log(locals)
				res.render('index', locals)
	    }
		
	}

	WalletController.get_charts = (req, res, next) => {

		if(req.session.login){

			res.render('charts', { titulo: "Panel de Usuario", 
			nombre : req.session.nombre,
			address : req.session.address,
			bitcoin : req.session.bitcoin,
			alert_message : '',
			alert_status : '',
			activa : "charts",
			charts : "active" });
		} else {
	      	let locals = {
				alert_message : "Su sesion a finalizado",
				alert_status : 'show',
			}
			console.log(locals)
			res.render('index', locals)
	    }
	}

	WalletController.get_transactions = (req, res, next) => {
		console.log(req.session.id_usuario);
		if(req.session.login){
			WalletModel.get_all_transactions_by_id_user(req.session.address, (err, rows) => {
				if(err){	
					res.render('transactions', {
					titulo: "Panel de Usuario - Transacciones",
					//nombre : req.session.nombre,
					address : req.session.address,
					bitcoin : req.session.bitcoin,
					activa : "transactions",
					alert_message : 'Error en la comunicacion con la BD',
					alert_status : 'show',
					dashboard : "active"});	

					req.session.alert_status = "";
					req.session.alert_message = "";				
					//console.log(err);
				}
				else{
					res.render('transactions', { 
					//titulo: req.params.currency,
					titulo: "Panel de Usuario - Transacciones",
					//nombre : req.session.nombre,
					address : req.session.address,
					//bitcoin : req.session.bitcoin,
					transacciones : rows,
					alert_message : req.session.alert_message,
					alert_status : req.session.alert_status,
					activa : "transactions",
					transactions : "active"});/**/

					req.session.alert_status = "";
					req.session.alert_message = "";				
				}
			})
		} else {
	      	let locals = {
				alert_message : "Su sesion a finalizado",
				alert_status : 'show',
			}
			console.log(locals)
			res.render('index', locals)
	    }
	}

	WalletController.get_addresses = (req, res, next) => {

		if(req.session.login){
			WalletModel.get_all_address(req.session.id_usuario, (err, rows) => {
				console.log(rows);
				if(err){
					res.render('addresses', { titulo: "Panel de Usuario - Direcciones", 
					//nombre : req.session.nombre,
					address : req.session.address,
					//bitcoin : req.session.bitcoin,
					alert_message : 'Error en la comunicacion con la BD',
					alert_status : 'show',
					activa : "addresses",
					addresses : "active"});/**/

					req.session.alert_status = "";
					req.session.alert_message = "";
					console.log(err);
				}
				else{

					let tam = rows.length;
					var activas = new Array();
					var inactivas = new Array();

					for(var i = 0; i < tam; i++){
						if(rows[i].id_status == 1){
							activas.push(rows[i]);
						}
						else{
							inactivas.push(rows[i]);
						}
					}



					res.render('addresses', { titulo: "Panel de Usuario - Direcciones", 
					//nombre : req.session.nombre,
					address : req.session.address,
					//bitcoin : req.session.bitcoin,
					activas : rows,
					//inactivas: inactivas,
					alert_message : req.session.alert_message,
					alert_status : req.session.alert_status,
					activa : "addresses",
					addresses : "active"});/**/

					req.session.alert_status = "";
					req.session.alert_message = "";
				}
			})
		} else {
	      	let locals = {
				alert_message : "Su sesion a finalizado",
				alert_status : 'show'
			}
			console.log(locals)
			res.render('index', locals)
	    }
	}

	WalletController.logout = (req, res, next) => {
		req.session.destroy(function(){
      		console.log("user logged out.")
   		})
		res.redirect('/')
	}


	WalletController.update_address = (req, res, next) => {}

	WalletController.get_name_user = (req, res, next) => {}

	WalletController.get_main_address = (req, res, next) => {}

	WalletController.get_all_address = (req, res, next) => {}



	WalletController.get_error_404 = (req, res, next) => {
		let error = new Error();

		error.status = 404
		var locals = {
			titulo : "Error 404",
			descripcion : 'Recurso no Encontrado',
			error : error
		}

		
	    res.render('error', locals);

		//next();
	}

	
function ethereum_market(callback)
{
    let curl = require('curlrequest');
    let options = {url:"https://api.coinmarketcap.com/v1/ticker/ethereum/"}
    curl.request(options,(err,response)=>{
        
        if(err){console.log(err); return;}
        
        var out = response;
        out = out.split(",");
        aux = out[4].replace('"price_usd": "',"");
        aux = aux.trim();
        aux = aux.replace('"',"");
        callback(aux);
    });
}

module.exports = WalletController