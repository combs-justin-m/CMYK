;(function (){

  'use strict';

  angular.module('app')

  .controller('Home', ['$scope', '$http', '$location', 'PARSE',
    function($scope, $http, $location, PARSE){

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

      $scope.editColor = function(x) {

        $('#colorInput').val(x.hex);
      }

      $scope.deleteColor = function(x) {

        var objId = x.objectId;

        $http.delete(PARSE.URL + 'classes/mycolors/' + objId, PARSE.CONFIG)
          .success( function (data) {
            console.log(data)
            $scope.colorList = _.without($scope.colorList, x);
        });
      }

    }]);

}());