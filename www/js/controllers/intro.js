cortrollerModule.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
  $scope.startApp = function() {
    $state.go('login');
    window.localStorage.setItem("IntroDone", 1);
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})
