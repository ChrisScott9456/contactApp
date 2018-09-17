const contactApp = angular.module('contactApp', ['ngRoute', 'ngMaterial']);

contactApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/',
		})

	$locationProvider.html5Mode(true);
}]);

/******************************AngularJS Controller******************************/

contactApp.controller('contactCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.contactList = [];

	$scope.listContacts = function() {
		$http.get('/getContactsList').then(function(res) {
			console.log(res.data.count);
			$scope.contactList = res.data.count;
		});
	};

	$scope.getButton = function() {
		let contactID = 1;

		return $http.get('/getContact/' + contactID).then(function(res) {
			console.log(res.data);
		});
	};

	$scope.updateButton = function() {
		let newContact = {
			_id: 1,
			OPCO: 'RGS',
			ContactID: 000000001,
			FirstName: 'John',
			LastName: 'Doe',
			JobTitle: 'Regional Manager',
			Phone: {
				String: '777-777-7777',
				Extension: '1',
				Type: 'Office'
			},
			Email: 'chris.scott@test.com',
			Birthday: '12/12/2012'
		};

		return $http.post('/updateContact', newContact).then(function(res) {
			console.log(res.data);
		});
	}

	$scope.postButton = function() {
		let newContact = {
			_id: 1
		};

		return $http.post('/createContact', newContact).then(function(res) {
			console.log(res.data);
		});
	};

	$scope.deleteButton = function() {
		let contactID = 1;

		return $http.post('/deleteContact/' + contactID).then(function(res) {
			console.log(res.data);
		});
	}

}]);