/* UI-Routes */
webrdApp.config(['$stateProvider','$urlRouterProvider','$locationProvider','$httpProvider','$analyticsProvider','grecaptchaProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $analyticsProvider, grecaptchaProvider) {

    //'$authProvider'

    //OAUTH2 - SOCIAL LOGINS
    /*$authProvider.facebook({
      clientId: '1592245831031700'
    });

    $authProvider.google({
      clientId: '1019358561318-moia6cl6mfflqb9c04l0tisvq45q940v.apps.googleusercontent.com'
    });*/

    //grecaptcha stuff
    grecaptchaProvider.setParameters({
            sitekey: '6LeJXwATAAAAAPGHaBArOKkjkmoUFh49X8EjVE3m',
            theme: 'light'
    });

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
        
        
   
