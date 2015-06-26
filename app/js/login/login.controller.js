;(function (){

  'use strict';

  angular.module('app')

  .controller('Login', ['$scope', '$http', 'PARSE', '$location' ,
    function($scope, $http, PARSE, $location){

      $('.modal-trigger').leanModal();

      var User = function(options) {
        this.username = options.username;
        this.password = options.password;
      };

      $scope.addUser = function(u) {
        var x = new User(u);

        $http.post(PARSE.URL + 'users/', x, PARSE.CONFIG)

        .success(function(data){

          Cookies.set('objectId', data.objectId, { expires: Infinity });
          Cookies.set('sessionToken', data.sessionToken, { expires: Infinity });
          Cookies.set('username', data.username, { expires: Infinity });

          window.location.href = ''
        })

        .error(function(data){
          $('.signupField').addClass('error');
          $scope.user.username = '';
          $scope.user.password = '';
          $('.signupName').attr("placeholder", data.error.toUpperCase()).placeholder();
        });
      };

      $scope.loginUser = function(u) {
        var x = new User(u);

        $http.get(PARSE.URL + 'login/?username=' + encodeURIComponent(x.username) + '&password=' + encodeURIComponent(x.password), PARSE.CONFIG)

        .success(function(data){
          Cookies.set('objectId', data.objectId, { expires: Infinity });
          Cookies.set('sessionToken', data.sessionToken, { expires: Infinity });
          Cookies.set('username', data.username, { expires: Infinity });

           window.location.href = '';
        })

        .error(function(data){
          var name = $('.loginName');

          $('.loginField').addClass('error');
          $scope.userLogin.username = '';
          $scope.userLogin.password = '';
          name.attr("placeholder", data.error.toUpperCase()).placeholder();
        });
      }

    }])

}());