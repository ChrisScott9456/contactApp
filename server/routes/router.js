const express = require('express');
const router = express.Router();

//MongoDB Models
const Contact = require('../models/contact');

/******************************Contact REST Calls******************************/

router.get('/getContact/:id', function(req, res) {
	Contact.getContact(req.params.id).then(function(resp) {
		if(resp) {
			console.log('Here is the GET response: ' + resp);
			res.send({status: 'Success', msg: resp});
		}else {
			res.send({status: 'Failure', msg: 'Error getting the contact!'});
		}
	}).catch(function(err) {
		console.log('CONTACT GET ERROR: ' + err);
		res.send(err);
	});
});

router.post('/createContact', function(req, res) {
	let newContact = new Contact({
		_id: req.body._id,
	})

	Contact.createContact(newContact).then(function(resp) {
		if(resp) {
			console.log('Here is the POST response: ' + resp);
			res.send({status: 'Success', msg: resp});
		}else {
			res.send({status: 'Failure', msg: 'Error creating the contact!'});
		}
	}).catch(function(err) {
		console.log('CONTACT CREATION ERROR: ' + err);
		res.send(err);
	});
});

router.post('/deleteContact/:id', function(req, res) {
	Contact.deleteContact(req.params.id).then(function(resp) {
		if(resp) {
			console.log('Here is the DELETE response: ' + resp);
			res.send({status: 'Success', msg: resp});
		}else {
			res.send({status: 'Failure', msg: 'Error deleting the contact!'});
		}
	}).catch(function(err) {
		console.log('ERROR DELETEING CONTACT: ' + err);
		res.send(err);
	});
});

router.get('/', function(req, res) {
	res.render('index.ejs');
});

module.exports = router;