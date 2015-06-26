;(function (){

  'use strict';

  angular.module('app', ['ngRoute'])

  .constant('PARSE', {
    URL: 'https://api.parse.com/1/',
    CONFIG: {
      headers: {
       'X-Parse-Application-Id' : 'MaTkrt5E8cqroHAcy9pdTziCADeLJky28WewF3hK',
       'X-Parse-REST-API-Key'  : 'NCZxLr0xLG9tlGmGMPdk9QCHqmisE1N28nvsdKEC',
       'X-Parse-Session-Token': Cookies.get('sessionToken')
      }
    }
  })

  .config(['$routeProvider',
    function($routeProvider){

      $routeProvider.when('/login', {
        controller:   'Login',
        templateUrl:  'js/login/login.tpl.html'
      })

      .when('/', {
        controller:   'Home',
        templateUrl:  'js/home/home.tpl.html'
      })

       .otherwise({ redirectTo: '/' });

    }])

  .run(['$rootScope', '$location',
    function($rootScope, $location){

      $rootScope.$on('$routeChangeStart', function(){

        var LoggedIn = Cookies.get('sessionToken') !== undefined;

          if (LoggedIn) {
            $location.path('/');
          } else {
            $location.path('/login');
          }

      });

    }]);

}());
