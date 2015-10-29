webrdApp.controller('HomeController', ['$scope','$stateParams', function ($scope,$stateParams) {
	
	$scope.numbers = $stateParams.numbers;
	
}]);