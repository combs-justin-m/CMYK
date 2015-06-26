;(function (){

  'use strict';

  angular.module('app')

  .controller('Home', ['$scope', '$http', '$location', 'PARSE',
    function($scope, $http, $location, PARSE){

      $scope.logout = function() {

        $http.post(PARSE.URL + 'logout','', PARSE.CONFIG)

        .success(function(data){

          Cookies.expire('sessionToken', data.sessionToken);
          Cookies.expire('username', data.username);

          window.location.reload();

        });
      };

      $scope.colorList = [];

      var Color = function(options) {
        this.hex = options.hex;
        this.ACL = {
                    "JNl7n1NaXE": {
                      "read": true,
                      "write": true
                    },
                    "*": {
                      "read": true
                    }
                  }

      }

      $scope.addColor = function(x) {

        if (x.hex.length < 6) {
          return alert('fail');
        }

        var color = new Color(x);

        console.log(color);

        $http.post(PARSE.URL + 'classes/mycolors',x, PARSE.CONFIG)

        .success(function(data){

          $scope.colorList.push(color);

          $scope.c = {};

        });


      }

    }]);

}());