;(function (){

  'use strict';

  var sessionToken = '';
  if(Cookies.get('sessionToken') !== undefined ){
    sessionToken = Cookies.get('sessionToken');
  }

  angular.module('app', ['ngRoute'])

  .constant('PARSE', {
    URL: 'https://api.parse.com/1/',
    CONFIG: {
      headers: {
       'X-Parse-Application-Id' : 'MaTkrt5E8cqroHAcy9pdTziCADeLJky28WewF3hK',
       'X-Parse-REST-API-Key'  : 'NCZxLr0xLG9tlGmGMPdk9QCHqmisE1N28nvsdKEC',
       'X-Parse-Session-Token': sessionToken
      }
    }
  })

  .config(['$routeProvider',
    function($routeProvider){

      $routeProvider.when('/login', {

        controller:   'Login',
        templateUrl:  'js/login/login.tpl.html'

      });

    }]);

}());
