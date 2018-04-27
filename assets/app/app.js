'use strict';

var app = angular.module('formApp', [
  'ngAnimate','ui.bootstrap','ngFileUpload'
]);
app.controller('formCtrl', ['$scope','Upload', '$http', function($scope, Upload, $http) {
  $scope.formParams = {};
  $scope.stage = "";
  $scope.formValidation = false;
  $scope.toggleJSONView = false;
  $scope.toggleFormErrorsView = false;
  
  $scope.formParams = {
    ccEmail: '',
    ccEmailList: []
  };
  $scope.date = "";
  console.log($scope.formParams);
  $scope.uploadPic = function(file) {
    console.log(file,'fileData');
   $http({
        method: 'POST',
        url: 'http://localhost/codeigniter3-rest-api/index.php/api/users/uploadFile',
        data: JSON.stringify(file)
      }).then(function successCallback(response) {
        if (response
          && response.data
          && response.data.status
          && response.data.status === 'success') {
          $scope.stage = "success";
        } else {
          if (response
            && response.data
            && response.data.status
            && response.data.status === 'error') {
            $scope.stage = "error";
          }
        }
      }, function errorCallback(response) {
        $scope.stage = "error";
        console.log(response);
      });
    }
  // Navigation functions
  $scope.next = function (stage) {
    //$scope.direction = 1;
    //$scope.stage = stage;
    
    $scope.formValidation = true;
    
    if ($scope.multiStepForm.$valid) {
      $scope.direction = 1;
      $scope.stage = stage;
      $scope.formValidation = false;
    }
  };

  $scope.back = function (stage) {
    $scope.direction = 0;
    $scope.stage = stage;
  };
  
  // CC email list functions
  $scope.addCCEmail = function () {
    $scope.rowId++;

    var email = {
      email: $scope.formParams.ccEmail,
      row_id: $scope.rowId
    };

    $scope.formParams.ccEmailList.push(email);

    $scope.formParams.ccEmail = '';
  };

  $scope.removeCCEmail = function (row_id) {
    for (var i = 0; i < $scope.formParams.ccEmailList.length; i++) {
      if ($scope.formParams.ccEmailList[i].row_id === row_id) {
        $scope.formParams.ccEmailList.splice(i, 1);
        break;
      }
    }
  };
  
  
  // Post to desired exposed web service.
  $scope.submitForm = function () {
    var wsUrl = "someURL";

    // Check form validity and submit data using $http
    if ($scope.multiStepForm.$valid) {
      $scope.formValidation = false;

      $http({
        method: 'POST',
        url: wsUrl,
        data: JSON.stringify($scope.formParams)
      }).then(function successCallback(response) {
        if (response
          && response.data
          && response.data.status
          && response.data.status === 'success') {
          $scope.stage = "success";
        } else {
          if (response
            && response.data
            && response.data.status
            && response.data.status === 'error') {
            $scope.stage = "error";
          }
        }
      }, function errorCallback(response) {
        $scope.stage = "error";
        console.log(response);
      });
    }
  };
  
  $scope.reset = function() {
    // Clean up scope before destorying
    $scope.formParams = {};
    $scope.stage = "";
  }
}]);
app.directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }
  }]);
app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            $(element).datepicker({
                dateFormat: 'DD, d  MM, yy',
                onSelect: function (date) {
                    scope.date = date;
                    scope.$apply();

                    scope.$apply(function() {
                        scope.formParams.date = date;  
                    });
                }
            });
        }
    };
});