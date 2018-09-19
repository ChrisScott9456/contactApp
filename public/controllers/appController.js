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

	$scope.editContactForm = false;
	$scope.copyContact = {};
	$scope.updatedBirthday = {month: "", day: ""};
	$scope.contactList = [];
	$scope.dateMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
	$scope.weekdayMap = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	$scope.monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var testID = 1;

	$scope.test = function() {
		console.log("TEST" + $scope.editContactForm);
	}

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

	$scope.updateContact = function(contact) {
		console.log($scope.editContactForm);
		let errorFlag = false;
		let errorCount = 0;
		$scope.contactEditErrors = [];
		$scope.contactEditErrorMsg = "";
		$scope.copyContact = contact;
		console.log($scope.copyContact);

		if($scope.copyContact.FirstName == undefined || $scope.copyContact.FirstName == ''){
			errorFlag = true;
			$scope.contactEditErrors[errorCount] = "FirstName";
			errorCount++;
		}
		if($scope.copyContact.LastName == undefined || $scope.copyContact.LastName == ''){
			errorFlag = true;
			$scope.contactEditErrors[errorCount] = "LastName";
			errorCount++;
		}
		if($scope.copyContact.Phone.Number == undefined || $scope.copyContact.Phone.Number == ''){
			errorFlag = true;
			$scope.contactEditErrors[errorCount] = "Phone or Email";
			errorCount++;
		}else if($scope.copyContact.Email == undefined || $scope.copyContact.Email == ''){
			errorFlag = true;
			$scope.contactEditErrors[errorCount] = "Phone or Email";
			errorCount++;
		}
		
		if(errorFlag) {
			$scope.contactEditErrorMsg = "The following fields must be filled: " + $scope.contactEditErrors.toString();
		}else {
			$scope.editContactForm = false;
			// $http.post('/updateContact', $scope.copyContact).then(function(res) {
			// 	console.log(res.data);
			// });
		}
	}

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