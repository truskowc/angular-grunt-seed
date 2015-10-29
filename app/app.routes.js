/* UI-Routes */
webrdApp.config(['$stateProvider','$urlRouterProvider','$locationProvider','$httpProvider','$analyticsProvider','grecaptchaProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $analyticsProvider, grecaptchaProvider) {

    //routing stuff
    $urlRouterProvider.otherwise('/');    
    
    // use the HTML5 History API
    $locationProvider.html5Mode(true).hashPrefix('!');
    
    $stateProvider
    
        .state('/', {
            url: '/:numbers',
            templateUrl: 'app/components/home/partial-home.html'    
        })
        
        .state('styleguide', {
            url: '/styleguide/',
            templateUrl: 'app/components/styleguide/partial-styleguide.html'    
        })

        .state('clear',{
            url: '/clear',
            controller:['$state', function($state){
                window.localStorage.clear();
                $state.go('/')
            }],
        })
        
}]);        
        
        
   
