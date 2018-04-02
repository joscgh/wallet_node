'use strict'

var request = require('request');
var secret = require('../config/secret'),

	WalletRequest = () => {
		//creacion de un protitipo
	}

	WalletRequest.request_wallet = (datos, cb) => {

		let url = secret.url + secret.wallet + "api_key=" + secret.api_key;

		console.log(url);
		request(url, cb)
	}

	WalletRequest.request_balance = (cb) => {

		let url = secret.url + secret.balance + "api_key=" + secret.api_key;

		console.log(url);
		//request(url, cb)
	}

	WalletRequest.request_create = (datos, cb) => {

		let url = secret.url + secret.create + "api_key=" + secret.api_key + "&password="  + datos.password + 
		"&mail=" + datos.email + "&label=" + secret.label;

		console.log(url);
		request(url, cb)
	}

	WalletRequest.request_send = (datos, cb) => {

		let url = secret.url + secret.send + "api_key=" + secret.api_key + "&to="  + datos.address + 
		"&mount=" + datos.mount + "&fee=" + datos.fee + "&pin=" + secret.pin;

		console.log(url);
		request(url, cb)
	}	

	WalletRequest.request_newaddress = (cb) => {

		let url = secret.url + secret.newaddress + "api_key=" + secret.api_key + "&label="  + secret.label;

		console.log(url);
		request(url, cb)
	}


	WalletRequest.request_addressbalance = (datos, cb) => {

		let url = secret.url + secret.addressbalance + "api_key=" + secret.api_key + "&address="  + datos.address;

		console.log(url);
		request(url, cb)
	}

	WalletRequest.request_archive = (datos, cb) => {

		let url = secret.url + secret.archive + "api_key=" + secret.api_key + "&address="  + datos.address;

		console.log(url);
		request(url, cb)
	}

	WalletRequest.request_listaddress = (datos, cb) => {

		let url = secret.url + secret.listaddress + "api_key=" + secret.api_key + "&address="  + datos.address;

		console.log(url);
		request(url, cb)
	}

	WalletRequest.request_bitcoin = (datos, cb) => {

		let url = secret.url + secret.bitcoin + "value=" + datos.value + "&coin="  + datos.coin;

		console.log(url);
		request(url, cb)
	}

module.exports = WalletRequest