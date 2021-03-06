const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Contact Schema
const contactSchema = new Schema({
	_id: {
		type: Number,
	},

	OPCO: {
		type: String
	},
	
	ContactID: {
		type: Number
	},
	
	FirstName: {
		type: String,
		default: ""
	},
	
	LastName: {
		type: String,
		default: ""
	},

	JobTitle: {
		type: String
	},

	Phone: {
		Type: {
			type: String
		},

		Extension: {
			type: String
		},

		Number: {
			type: String
		}
	},

	Email: {
		type: String
	},

	Birthday: {
		Month: {
			type: String
		},
		Day: {
			type: Number
		}
	},

	Address: {
		type: String
	},

	Connect: {
		Call: {
			type: Date
		},
		Visit: {
			type: Date
		}
	}
},	

{ collection: 'Contacts' });

const Contact = module.exports = mongoose.model('Contact', contactSchema);

module.exports.getContact = function(id) {
	return new Promise(function(resolve, reject) {
		Contact.findById(id).exec().then(function(resp) {
			resolve(resp);
		}).catch(function(err) {
			reject(err);
		});
	});
}

module.exports.createContact = function(newContact) {
	return new Promise(function(resolve, reject) {
		newContact.save().then(function(resp) {
			resolve(resp);
		}).catch(function(err) {
			reject(err);
		});
	});
}

module.exports.updateContact = function(req) {
	return new Promise(function(resolve, reject) {
		if(req.body._id !== null) {
			Contact.findByIdAndUpdate(req.body._id, req.body, {new: true}).exec().then(function(resp) {
				resolve(resp);
			}).catch(function(err) {
				reject(err);
			});
		}else {
			reject(new ReferenceError('Cannot find _id in request'));
		}
	});
}

module.exports.deleteContact = function(id) {
	return new Promise(function(resolve, reject) {
		Contact.findByIdAndDelete(id).exec().then(function(resp) {
			resolve(resp);
		}).catch(function(err) {
			reject(err);
		});
	});
}

module.exports.getContactsList = function() {
	return new Promise(function(resolve, reject) {
		Contact.find({}).exec().then(function(resp) {
			resolve(resp);
		}).catch(function(err) {
			reject(err);
		});
	});
}