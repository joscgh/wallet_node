'use strict'

var connection = require('./wallet_connection'),
	WalletModel = () => {
		//creacion de un protitipo
	}

	WalletModel.validate_email  = (data, cb) => {
		console.log(data)
		connection.query('SELECT * FROM account WHERE correo = ?', data, cb)
	}

	WalletModel.login = (data, cb) => {
		connection.query('SELECT * FROM account WHERE correo = ? AND password = ?', data, cb)
	}

	WalletModel.insert_user = (data, cb) => {
		connection.query('INSERT INTO account SET ?', data, cb)
	}

	WalletModel.insert_address = (data, cb) => {
		connection.query('INSERT INTO address SET ?', data, cb)
	}

	WalletModel.insert_transaction = (data, cb) => {
		connection.query('INSERT INTO transaction SET ?', data, cb)
	}

	WalletModel.update_user = (data, cb) => {
		connection.query('UPDATE usuarios SET ? WHERE id_usuario = ?', [data,data.id_usuario], cb)
	}

	WalletModel.delete_secundary_address = (data, cb) => {
		connection.query('DELETE FROM direcciones WHERE id_direccion = ? ', data, cb)
	}

	WalletModel.get_name_user_by_id = (data, cb) => {
		connection.query('SELECT nombre FROM account WHERE id = ? ', data, cb)
	}

	WalletModel.get_user_by_email = (data, cb) => {
		connection.query('SELECT * FROM account WHERE correo = ? ', data, cb)
	}

	WalletModel.get_main_address = (data, cb) => {
		connection.query('SELECT * FROM account WHERE id = ?', data, cb)
	}

	WalletModel.get_all_secundary_address = (data, cb) => {
		connection.query('SELECT * FROM direcciones WHERE id_usuario = ? ', data, cb)
	}

	WalletModel.get_all_address_by_id_user = (data, cb) => {
		connection.query('SELECT id_direccion, direccion, saldo, status.id_status, status FROM direcciones '+
			'INNER JOIN status ON direcciones.id_status = status.id_status WHERE id_usuario = ? ', data, cb)
	}

	WalletModel.get_all_transactions_by_currency_and_id_user = (data, cb) => {
		connection.query('SELECT * FROM transaction WHERE id_currency = ? AND id_usuario = ?', data, cb)
	}

	WalletModel.get_all_transactions_by_id_user = (data, cb) => {
		connection.query('SELECT * ' +
		' FROM transaction INNER JOIN account ON transaction.de = account.address ' + 
		'WHERE account.address = ?', data, cb)
	}
	WalletModel.get_all_transactions = (data, cb) => {
		connection.query('SELECT * ' +
		' FROM transaction', data, cb)
	}

	WalletModel.get_all_address = (data, cb) => {
		connection.query('SELECT * ' +
		' FROM account', data, cb)
	}
module.exports = WalletModel