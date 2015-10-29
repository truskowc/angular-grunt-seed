/* Creates header entity */
webrdApp

.directive('shopHeader', [ function() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/header/shop-header.html'
  };
}])

/* Creates footer entity */
.directive('basicFooter', [ function() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/footer/footer.html'
  };
}])

.directive("menu", [function() {
    return {
        restrict: "E",
        template: "<div ng-class='{ showMenu: rightVisible, right: true }' ng-transclude></div>",
        transclude: true
    };
}])

.directive("menuItem", [function() {
     return {
         restrict: "E",
         template: "<div ng-transclude></div>",
         transclude: true,
        
         link: function($scope) {
             
         }
     }
}])