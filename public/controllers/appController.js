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

	$scope.getButton = function() {
		let contactID = 0;

		return $http.get('/getContact/' + contactID).then(function(res) {
			console.log(res.data);
		});
	};

	$scope.updateButton = function() {
		let newContact = {
			_id: 0,
			FirstName: 'Chris',
			LastName: 'Scott'
		};

		return $http.post('/updateContact', newContact).then(function(res) {
			console.log(res.data);
		});
	}

	$scope.postButton = function() {
		let newContact = {
			_id: 0
		};

		return $http.post('/createContact', newContact).then(function(res) {
			console.log(res.data);
		});
	};

	$scope.deleteButton = function() {
		let contactID = 0;

		return $http.post('/deleteContact/' + contactID).then(function(res) {
			console.log(res.data);
		});
	}

}]);