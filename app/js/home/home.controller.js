;(function (){

  'use strict';

  angular.module('app')

  .controller('Home', ['$scope', '$rootScope', '$http', '$location', 'PARSE',
    function($scope, $rootScope, $http, $location, PARSE){

      $scope.visible = false;

      $scope.colorList = [];

      $http.get(PARSE.URL + 'classes/mycolors', PARSE.CONFIG)
        .success(function(data){
          $scope.colorList = data.results;
        })

      $scope.logout = function() {

        $http.post(PARSE.URL + 'logout','', PARSE.CONFIG)

        .success(function(data){

          Cookies.expire('objectId', data.sessionToken);
          Cookies.expire('sessionToken', data.sessionToken);
          Cookies.expire('username', data.username);

          window.location.reload();

        });
      };

      var userID = Cookies.get('objectId');

      var Color = function(options) {
        this.hex = options.hex;
        this.ACL = {
                    JNl7n1NaXE: {
                      "read": true,
                      "write": true
                    },
                    "*": {
                      "read": false
                    }
                  }

      }

      $scope.addColor = function(x) {

        var color = new Color(x);

        console.log(color);

        $http.post(PARSE.URL + 'classes/mycolors',x, PARSE.CONFIG)

        .success(function(data){

          color.objectId = data.objectId;

          $scope.colorList.push(color);

          $scope.c = {};

        });
      }

      $scope.updateColor = function(x) {

        $http.put(PARSE.URL + 'classes/mycolors/' + x.objectId, x, PARSE.CONFIG)
          .success(function(data){
            $scope.visible = false;
          })
      }

      $scope.deleteColor = function(x) {

        $http.delete(PARSE.URL + 'classes/mycolors/' + x.objectId, PARSE.CONFIG)
          .success( function (data) {
            $scope.colorList = _.without($scope.colorList, x);
        });
      }

    }]);

}());