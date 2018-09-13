const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Contact Schema
const contactSchema = new Schema({
	_id: {
		type: Number,
	},

	// OPCO: {
	// 	type: String
	// },
	
	// ContactID: {
	// 	type: Number
	// },
	
	FirstName: {
		type: String,
		default: ""
	},
	
	LastName: {
		type: String,
		default: ""
	}

	// JobTitle: {
	// 	Type: String
	// },

	// Phone: {
	// 	Number: {
	// 		type: Number
	// 	},

	// 	Extension: {
	// 		type: Number
	// 	},

	// 	Type: {
	// 		type: String
	// 	}
	// },

	// Email: {
	// 	type: String
	// },

	// Birthday: {
	// 	type: Date
	// }
},	

{ collection: 'Contacts' });

const Contact = module.exports = mongoose.model('Contact', contactSchema);

module.exports.getContact = function(id) {
	return Contact.findById(id).exec();
}

module.exports.createContact = function(newContact) {
	return newContact.save(); //save() function returns a Promise in Mongoose
}

module.exports.deleteContact = function(id) {
	return Contact.deleteOne({_id: id}).exec();
}