webrdApp.run(['$rootScope','HalService','cart', '$state',function ($rootScope, HalService,cart,$state) { //AUTH_EVENTS, AuthService
  $rootScope.$state = $state;
  //HalService.load();

  $rootScope.api = (location.href.indexOf('m.') !== -1) ? 'https://www.yoursite.com/api/' : 'https://www.yoursite.com/anotherApi';
  $rootScope.rest = (location.href.indexOf('m.') !== -1) ? 'https://www.yoursite.com/api/Ordering/' :'https://www.yoursite.com/anotherApi';

}])