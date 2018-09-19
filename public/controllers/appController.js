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

	$scope.newBirthday = "";
	$scope.contactList = [];
	$scope.weekdayMap = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	$scope.monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
			FirstName: 'John',
			LastName: 'Doe',
			JobTitle: 'Manager',
			Phone: {
				Type: 'Office',
				Extension: 1,
				Number: '999-999-9999'
			},
			Email: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaachris.scott@test.com',
			Birthday: '12/08/2012',
			Address: '3000 Test Rd. Atlanta, GA 30308',
			Connect: {
				Call: '09/23/2014',
				Visit: '05/12/2018'
			}
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

	$scope.formatBirthday = function(birthday) {
		if(birthday) {
			let newBirthday = "";

			newBirthday = new Date(birthday);

			return newBirthday.getMonth()+1 + "/" + newBirthday.getDate() + "/" + newBirthday.getFullYear();
		}else {
			return "";
		}
	}

	$scope.formatConnect = function(connect) {
		if(connect) {
			let newConnect = new Date(connect);
			let newDay = $scope.weekdayMap[newConnect.getDay()];
			let newMonth = $scope.monthMap[newConnect.getMonth()+1];

			return newDay + " | " + newMonth + " " + newConnect.getDate() + ", " + newConnect.getFullYear();
		}else {
			return "";
		}
	}
}]);