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
		contact.contactEditErrorMsg = "";
		contact.fNameInvalidError = false;
		contact.lNameInvalidError = false;
		contact.fNameMissingError = false;
		contact.lNameMissingError = false;
		contact.emailInvalidError = false;
		contact.phoneExtensionInvalidError = false;
		contact.phoneNumberInvalidError = false;
		contact.phoneTypeInvalidError = false;
		contact.titleInvalidError = false;

		$scope.copyContact = contact;

		//Remove extra whitespace before and after input
		$scope.copyContact.FirstName = $scope.copyContact.FirstName.trim();
		$scope.copyContact.LastName = $scope.copyContact.LastName.trim();
		$scope.copyContact.Phone.Number = $scope.copyContact.Phone.Number.trim();
		$scope.copyContact.Phone.Extension = $scope.copyContact.Phone.Extension.trim();
		$scope.copyContact.Phone.Type = $scope.copyContact.Phone.Type.trim();
		$scope.copyContact.Email = $scope.copyContact.Email.trim();
		$scope.copyContact.JobTitle = $scope.copyContact.JobTitle.trim();

		/////////////////////////////////////////////

		let nameRegex = /^[a-zA-z '-]+$/; //Regex for first & last name validation (letters, single quote, and dashes only)

		//Check if First Name is missing or invalid
		if($scope.copyContact.FirstName != undefined && $scope.copyContact.FirstName != ''){
			if(!$scope.copyContact.FirstName.match(nameRegex)) {
				contact.fNameInvalidError = true;
				errorFlag = true;
			}
		}else {
			contact.fNameMissingError = true;
			errorFlag = true;
		}
		/////////////////////////////////////////////

		//Check if Last Name is missing or invalid
		if($scope.copyContact.LastName != undefined && $scope.copyContact.LastName != ''){
			if(!$scope.copyContact.LastName.match(nameRegex)) {
				contact.lNameInvalidError = true;
				errorFlag = true;
			}
		}else {
			contact.lNameMissingError = true;
			errorFlag = true;
		}
		/////////////////////////////////////////////

		let phoneNumRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/; //Regex for matching phone number in 999-999-9999 format

		//Check if Phone Number is invalid
		if(!$scope.copyContact.Phone.Number.match(phoneNumRegex)) {
			contact.phoneNumberInvalidError = true;
			errorFlag = true;
		}
		/////////////////////////////////////////////

		let phoneExtRegex = /^[0-9]*\s*[0-9]*$/; //Regex for matching phone extension (can be a single number or two numbers with a space between them)
		//Example: 1
		//Example: 1 264
		//Example: 591

		//Check if Phone Extension is invalid
		if(!$scope.copyContact.Phone.Extension.match(phoneExtRegex)) {
			contact.phoneExtensionInvalidError = true;
			errorFlag = true;
		}
		/////////////////////////////////////////////

		let phoneTypeRegex = /^[a-zA-z ]*$/; //Regex for matching phone type (only letters and spaces)

		//Check if Phone Type is invalid
		if(!$scope.copyContact.Phone.Type.match(phoneTypeRegex)) {
			contact.phoneTypeInvalidError = true;
			errorFlag = true;
		}
		/////////////////////////////////////////////

		let emailRegex = /^.+@.+\..+$/;

		//Check if Email is invalid
		if(!$scope.copyContact.Email.match(emailRegex)) {
			contact.emailInvalidError = true;
			errorFlag = true;
		}
		/////////////////////////////////////////////

		//Check if phone or email are filled
		if($scope.copyContact.Phone.Number == undefined || $scope.copyContact.Phone.Number == ''){
			if($scope.copyContact.Email == undefined || $scope.copyContact.Email == ''){
				contact.contactEditErrorMsg += "Must have Phone or Email!";
				errorFlag = true;
			}
		}

		/////////////////////////////////////////////

		let jobTitleRegex = /^[a-zA-z ]*$/; //Regex for matching job title (only letters and spaces)

		//Check if Job Title is invalid
		if(!$scope.copyContact.JobTitle.match(jobTitleRegex)) {
			contact.titleInvalidError = true;
			errorFlag = true;
		}

		/////////////////////////////////////////////

		
		if(!errorFlag) {
			contact.editContactForm = false;

			$http.post('/updateContact', $scope.copyContact).then(function(res) {
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

}]);