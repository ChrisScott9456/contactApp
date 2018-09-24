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

	$scope.copyContact = {};
	$scope.contactList = [];
	$scope.dateMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
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

	$scope.updateContact = function(contact, editContactForm) {
		let errorFlag = false;
		$scope.contactEditErrorMsg = "";
		$scope.copyContact = contact;
		console.log($scope.copyContact);

		if(!$scope.validateName($scope.copyContact.FirstName)) {
			errorFlag = true;
			$scope.contactEditErrorMsg += "First Name must not be blank and can only contain letters, single quotes, and dashes!\n";
		}
		if(!$scope.validateName($scope.copyContact.LastName)){
			errorFlag = true;
			$scope.contactEditErrorMsg += "Last Name, ";
		}

		if($scope.copyContact.Phone.Number == undefined || $scope.copyContact.Phone.Number == ''){
			if($scope.copyContact.Email == undefined || $scope.copyContact.Email == ''){
				errorFlag = true;
				$scope.contactEditErrorMsg += "Phone or Email, ";
			}
		}
		
		if(!errorFlag) {
			contact.editContactForm = false;

			let updateContact = {
				_id: $scope.copyContact._id,
				FirstName: $scope.copyContact.FirstName,
				LastName: $scope.copyContact.LastName,
				JobTitle: $scope.copyContact.JobTitle,
				Phone: {
					Type: $scope.copyContact.Phone.Type,
					Extension: $scope.copyContact.Phone.Extension,
					Number: $scope.copyContact.Phone.Number
				},
				Email: $scope.copyContact.Email,
				Birthday: {
					Month: $scope.copyContact.Birthday.Month,
					Day: $scope.copyContact.Birthday.Day
				},
				Address: $scope.copyContact.Address
			}

			$http.post('/updateContact', updateContact).then(function(res) {
				console.log(res.data);
			});
		}
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
			Birthday: {
				Month: "Aug",
				Day: 12
			},
			Address: '3000 Test Rd. Atlanta, GA 30308',
			Connect: {
				Call: '09/23/2014',
				Visit: '05/12/2018'
			}
		};

		return $http.post('/updateContact', newContact).then(function(res) {
			console.log(res.data);
		});
	};

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
	};

	$scope.formatConnect = function(connect) {
		if(connect) {
			let newConnect = new Date(connect);
			let newDay = $scope.weekdayMap[newConnect.getDay()];
			let newMonth = $scope.monthMap[newConnect.getMonth()+1];

			return newDay + " | " + newMonth + " " + newConnect.getDate() + ", " + newConnect.getFullYear();
		}else {
			return "";
		}
	};

	$scope.validateName = function(name) {
		let letters = /^[a-zA-z '-]+$/; //Regex for name validation (letters, single quote, and dashes only)

		if(name != undefined || name != ''){
			if(name.match(letters)) {
				return true;
			}
		}

		return false;
	};


}]);