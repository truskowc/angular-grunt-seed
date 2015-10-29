var webrdApp = angular.module('smApp', ['ui.router','ui.bootstrap','uiGmapgoogle-maps', 'angulartics', 'angulartics.google.analytics', 'angular-hal','ngSanitize','grecaptcha'])

.controller('mainCtrl', ['$scope','$window','$rootScope', '$state','$filter',
	function($scope, $window, $rootScope, $state, $filter) {
 	
 	// Global vars
 	$scope.main = {
 		
	}
	
  	//left nav menu
    $scope.rightVisible = false;
	
	$scope.close = function() {
		$scope.rightVisible = false;
	};
	
    $scope.showRightA = function(e) {
        $scope.rightVisible = true;
        //e.stopPropagation();
    }

    //PATTERN VALIDATION IN FORMS
    $scope.emailPattern = (function(){
        var regexp = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        return {
            test: function(value) {
                return regexp.test(value);
            }
        };
    })();

    $scope.phoneNumberPattern = (function() {
        var regexp = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
        return {
            test: function(value) {
                return regexp.test(value);
            }
        };
    })();

    $scope.zipCodePattern = (function(){
        var regexp = /^\d{5}$|^\d{5}-\d{4}$/;
        return {
            test: function(value) {
                return regexp.test(value);
            }
        };
    })();

    $scope.passphraseReqs = (function(){
        var regexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
        return {
            test: function(value) {
                return regexp.test(value);
            }
        };
    })();

    $scope.formatPhone = function(value){
        if(value !== undefined){
            return $filter('tel')(value.replace(/[^0-9]+/g, ''));    
        }
    };

}])

.filter('titleCase', function() {
        return function(str) {
            return (str == undefined || str === null) ? '' : str.replace(/_|-/, ' ').replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
})

.filter('tel', function () {
    return function (tel) {
        if (!tel || (tel.length == 1 && tel == 1) ) { return ''; }
        var country, city, number;
        city = tel.slice(0,3);
        number = tel.slice(3, 6);
        if(tel.length > 5){
        	number += '-' + tel.slice(6,10);
        }
        return (" (" + city + ") " + number).trim();
    };
});
