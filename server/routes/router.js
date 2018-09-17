const express = require('express');
const router = express.Router();

//MongoDB Models
const Contact = require('../models/contact');

/******************************Contact REST Calls******************************/

router.get('/getContact/:id', function(req, res) {
	Contact.getContact(req.params.id).then(function(resp) {
		if(resp) {
			console.log('Here is the GET response: ' + resp);
			res.send({status: 'Get Success', msg: resp});
		}else {
			res.send({status: 'Get Failure', msg: 'Error getting the contact!'});
		}
	}).catch(function(err) {
		console.log(err);
		res.send({status: 'Get Failure', msg: '' + err});
	});
});

router.post('/updateContact', function(req, res) {
	Contact.updateContact(req).then(function(resp) {
		if(resp) {
			console.log('Here is the PUT response: ' + resp);
			res.send({status: 'Update Success', msg: resp});
		}else {
			res.send({status: 'Update Failure', msg: 'Error updating the contact!'});
		}
	}).catch(function(err) {
		console.log(err);
		res.send({status: 'Update Failure', msg: '' + err});
	});
});

router.post('/createContact', function(req, res) {
	let newContact = new Contact({
		_id: req.body._id,
	})

	Contact.createContact(newContact).then(function(resp) {
		if(resp) {
			console.log('Here is the POST response: ' + resp);
			res.send({status: 'Create Success', msg: resp});
		}else {
			res.send({status: 'Create Failure', msg: 'Error creating the contact!'});
		}
	}).catch(function(err) {
		console.log(err);
		res.send({status: 'Create Failure', msg: '' + err});
	});
});

router.post('/deleteContact/:id', function(req, res) {
	Contact.deleteContact(req.params.id).then(function(resp) {
		if(resp) {
			console.log('Here is the DELETE response: ' + resp);
			res.send({status: 'Delete Success', msg: resp});
		}else {
			res.send({status: 'Delete Failure', msg: 'Error deleting the contact!'});
		}
	}).catch(function(err) {
		console.log(err);
		res.send({status: 'Delete Failure', msg: '' + err});
	});
});

/***************************End of Contact REST Calls**************************/

router.get('/', function(req, res) {
	res.render('index.ejs');
});

module.exports = router;