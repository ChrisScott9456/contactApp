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
	var testID = 1;

	$scope.listContacts = function() {
		$http.get('/getContactsList').then(function(res) {
			console.log(res.data.count);
			$scope.contactList = res.data.count;
		});
	};

	$scope.getButton = function() {
		let contactID = 0;

		return $http.get('/getContact/' + testID).then(function(res) {
			console.log(res.data);
		});
	};

	$scope.updateButton = function() {
		let newContact = {
			_id: testID,
			OPCO: 'RGS',
			ContactID: 000000002,
			FirstName: 'Chris',
			LastName: 'Scott',
			JobTitle: 'Manager',
			Phone: {
				Number: '999-999-9999',
				Extension: 1,
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
			_id: testID
		};

		return $http.post('/createContact', newContact).then(function(res) {
			console.log(res.data);
		});
	};

	$scope.deleteButton = function() {
		let contactID = 0;

		return $http.post('/deleteContact/' + testID).then(function(res) {
			console.log(res.data);
		});
	}

}]);