cortrollerModule.controller('LoginCtrl', function($scope, $stateParams, $state, $timeout, $http, $rootScope, $ionicPopup, $window, $ionicModal, $ionicLoading) {
  $scope.loginData = {};
  $scope.authorized = false;
  $scope.RegisterData = {};


  $scope.show = function() {
    $ionicLoading.show({
      templateUrl:"templates/loading.html"
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide()
  };


  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.doRegister = function() {
    $scope.show();

    if($scope.RegisterData.password == $scope.RegisterData.password2){
          var config = {
            headers: {
              'Accept': 'application/json;',
              //'Content-Type': 'multipart/form-data;'
            }
          };
          $http.post("http://localhost:8000/api/v1/auth/register", {
            'email': $scope.RegisterData.email,
            'password': $scope.RegisterData.password,
            'name': $scope.RegisterData.name,
          }, config)

          .success(function(response) {
              $http.post("http://localhost:8000/api/v1/auth/login", {
                  'email': $scope.RegisterData.email,
                  'password': $scope.RegisterData.password,
                  //'name': $scope.RegisterData.nickname,
                }, config)
                .success(function(response) {
                  //$scope.result = response + "";
                  window.localStorage.setItem("Token", response.token);
                  $scope.authorized = true;
                  $scope.modal.hide();
                  $scope.hide();
                  $state.go('app.events');
                });

            })
            .error(function(error) {
              $scope.hide();
              var alertPopup = $ionicPopup.alert({
                title: 'Oops..',
                template: error.errors
              });

            });

    }
    else{
      $scope.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Oops..',
        template: '<center>Password did not match</center>'
      });

    }
  };


  $scope.doLogin = function() {
    $scope.show();
    var config = {
      headers: {
        'Accept': 'application/json;',
        //'Content-Type': 'multipart/form-data;'
      }
    };
    $http.post("http://localhost:8000/api/v1/auth/login", {
      'email': $scope.loginData.username,
      'password': $scope.loginData.password
    }, config)

    .success(function(response) {
        //$scope.result = response + "";
        window.localStorage.setItem("Token", response.token);
        $scope.authorized = true;
        $scope.hide();
        $state.go('app.events');
      })
      .error(function(error) {
        $scope.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Oops..',
          template: error.error
        });
      });
  }
})
