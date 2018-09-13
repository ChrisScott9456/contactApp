const contactApp = angular.module('contactApp', ['ngMaterial']);


/******************************AngularJS Controller******************************/

contactApp.controller('contactCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.getButton = function() {
		let contactID = 0;

		return $http.get('' + contactID).then(function(res) {
			console.log(res.data);
		});
	};

	$scope.postButton = function() {
		let newContact = {
			_id: 0
		};

		return $http.post('', newContact).then(function(res) {
			console.log(res);
		});
	};

}]);