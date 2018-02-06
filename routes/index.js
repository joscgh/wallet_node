'use strict'

var express = require('express');
var router = express.Router();
var WalletController = require('../controllers/wallet_controller');

/* GET home page. */
router
.get('/', WalletController.get_index)
.get('/logout', WalletController.logout)
.post('/login', WalletController.login) 
.post('/', WalletController.registrer)
.get('/dashboard', WalletController.get_dashboard)
.get('/charts', WalletController.get_charts)
//.get('/transacciones/:currency', WalletController.get_transactions)
.get('/transactions', WalletController.get_transactions)
.get('/addresses', WalletController.get_addresses)
.get('/newaddress', WalletController.request_newaddress)
.post('/send', WalletController.send)
//.post('/update', WalletController.validate_email)
.put('/update/:id_status', WalletController.update_address) 

//.post('/delete', WalletController.validate_email)
//.delete('/delete', WalletController.delete_address)  
.use(WalletController.get_error_404);

module.exports = router;


