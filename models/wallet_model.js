'use strict'

var connection = require('./wallet_connection'),
	WalletModel = () => {
		//creacion de un protitipo
	}

	WalletModel.validate_email  = (data, cb) => {
		console.log(data)
		connection.query('SELECT * FROM usuarios WHERE email = ?', data, cb)
	}

	WalletModel.login = (data, cb) => {
		connection.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', data, cb)
	}

	WalletModel.insert_user = (data, cb) => {
		connection.query('INSERT INTO usuarios SET ?', data, cb)
	}

	WalletModel.insert_address = (data, cb) => {
		connection.query('INSERT INTO direcciones SET ?', data, cb)
	}

	WalletModel.insert_transaction = (data, cb) => {
		connection.query('INSERT INTO transacciones SET ?', data, cb)
	}

	WalletModel.update_user = (data, cb) => {
		connection.query('UPDATE usuarios SET ? WHERE id_usuario = ?', [data,data.id_usuario], cb)
	}

	WalletModel.delete_secundary_address = (data, cb) => {
		connection.query('DELETE FROM direcciones WHERE id_direccion = ? ', data, cb)
	}

	WalletModel.get_name_user_by_id = (data, cb) => {
		connection.query('SELECT nombre FROM usuarios WHERE id_usuario = ? ', data, cb)
	}

	WalletModel.get_user_by_email = (data, cb) => {
		connection.query('SELECT * FROM usuarios WHERE email = ? ', data, cb)
	}

	WalletModel.get_main_address = (data, cb) => {
		connection.query('SELECT * FROM usuarios WHERE id_usuario = ? AND principal = 1 ', data, cb)
	}

	WalletModel.get_all_secundary_address = (data, cb) => {
		connection.query('SELECT * FROM direcciones WHERE id_usuario = ? ', data, cb)
	}

	WalletModel.get_all_address_by_id_user = (data, cb) => {
		connection.query('SELECT id_direccion, direccion, saldo, status.id_status, status FROM direcciones '+
			'INNER JOIN status ON direcciones.id_status = status.id_status WHERE id_usuario = ? ', data, cb)
	}

	WalletModel.get_all_transactions_by_currency_and_id_user = (data, cb) => {
		connection.query('SELECT * FROM transacciones WHERE id_currency = ? AND id_usuario = ?', data, cb)
	}

	WalletModel.get_all_transactions_by_id_user = (data, cb) => {
		connection.query('SELECT para, cantidad, descripcion, fee, status, nombre AS moneda, ' +
		'DATE_FORMAT(fecha, "%d/%m/%Y") AS fecha FROM transacciones INNER JOIN currency ON transacciones.id_currency = currency.id_currency ' + 
		'WHERE id_usuario = ?', data, cb)
	}

module.exports = WalletModel