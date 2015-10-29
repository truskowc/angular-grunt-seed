webrdApp.run(['$rootScope','HalService','cart', '$state',function ($rootScope, HalService,cart,$state) { //AUTH_EVENTS, AuthService
  $rootScope.$state = $state;
  //HalService.load();

  $rootScope.api = (location.href.indexOf('m.') !== -1) ? 'https://m.schnucks.com/api/' : 'https://coin.schnucks.com/jfehr/WebApp/';
  $rootScope.rest = (location.href.indexOf('m.') !== -1) ? 'https://m.schnucks.com/api/Ordering/' :'https://coin.schnucks.com/jfehr/WebApp/Ordering/';

}])