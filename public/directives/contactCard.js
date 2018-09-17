'use strict';

angular.module('contactApp')

.directive('contactCard', function() {
	return {
		restrict: 'E',
		templateUrl: '/views/contactCard.html',
		transclude: true,
		scope: '='
	};
});