'use strict';

angular.module('contactApp')

.directive('contactList', function() {
	return {
		restrict: 'E',
		templateUrl: '/views/contactList.html',
		transclude: true,
		scope: '='
	};
});