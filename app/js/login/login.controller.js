;(function (){

  'use strict';

  angular.module('app')

  .controller('Login', ['$scope', '$http', 'PARSE',
    function($scope, $http, PARSE){

      $('.modal-trigger').leanModal();

      var User = function(options) {
        this.username = options.username;
        this.password = options.password;
      };

      $scope.addUser = function(u) {
        var x = new User(u);

        $http.post(PARSE.URL + 'users/', x, PARSE.CONFIG)

        .success(function(data){
          console.log(data);
        });
      };

      $scope.loginUser = function(u) {
        var x = new User(u);

        $http.get(PARSE.URL + 'login/?username=' + encodeURIComponent(x.username) + '&password=' + encodeURIComponent(x.password), PARSE.CONFIG)

        .success(function(data){
          console.log(data);
        })
      }

    }])

}());