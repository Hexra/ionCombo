var cortrollerModule = angular.module('starter.controllers', [])

// **********************************************************
// controller for app and logOut
// **********************************************************

.controller('AppCtrl', function($scope,$filter, $ionicModal, $timeout, $state, $ionicLoading, ionicDatePicker, ionicTimePicker, $http, $ionicPopup) {
// $scope.newEventData = {};
// //$scope.myEventData = {};
//
// //load on enter view
// $scope.$on('$ionicView.enter', function() {
  // var config = {
  //                 headers : {
  //                     'Accept': 'application/json;',
  //                     'Authorization' : 'bearer' + window.localStorage['Token']
  //                 }
  //             };
  //           $http.get("http://localhost:8000/api/v1/events/?user_id=10", config)
  //                           .then(function(response){
  //                           var events = response.data.data;
  //                           $scope.myevents = events;
  //               });
// });
//
// $scope.doCreateEvent = function() {
//   $scope.show();
//   var config = {
//     headers: {
//       'Accept': 'application/json;',
//       'Authorization' : 'bearer' + window.localStorage['Token']
//       //'Content-Type': 'multipart/form-data;'
//     }
//   };
//   $http.post("http://localhost:8000/api/v1/events/", {
//     'title' : $scope.newEventData.title,
//     'description' : $scope.newEventData.description,
//     'participant' : $scope.newEventData.participant,
//     'contact_number' : $scope.newEventData.contact,
//     'location' : $scope.newEventData.location,
//     'time' : $scope.newEventData.timeOnly,
//     'event_date_start' : $scope.newEventData.dateOnly,
//     'event_duration' : $scope.newEventData.duration,
//   }, config)
//
//   .success(function(response) {
//       console.log(response.title);
//       console.log(response.description);
//       console.log(response.participant);
//       console.log(response.contact_number);
//       console.log(response.event_date_start);
//       console.log(response.location);
//       console.log(response.event_duration);
//       console.log(response.user_id);
//       $scope.hide();
//       $scope.modal.hide();
//       $scope.newEventData = {};
//     })
//     .error(function(error) {
//       $scope.hide();
//       var alertPopup = $ionicPopup.alert({
//         title: 'Oops..',
//         template: error.errors
//       });
//
//     });
//
// }
//
//
//
//
//
//
// // *************************************************************
// $scope.numberPickerObject = {
//     inputValue: 1, //Optional
//     minValue: 1,
//     maxValue: 9,
//     // decimalCharacter: '.',  //Optional
//     // decimalStep: 0.25,  //Optional
//     format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL"
//     // titleLabel: 'Number Picker',  //Optional
//     setLabel: 'Set',  //Optional
//     closeLabel: 'Close',  //Optional
//     setButtonType: 'button-balanced',  //Optional
//     closeButtonType: 'button-balanced',  //Optional
//     callback: function (val) {    //Mandatory
//         $scope.newEventData.duration = val;
//     }
// };
// // *************************************************************
//
//   var ipObj1 = {
//     callback: function(val) { //Mandatory
//     //  console.log('Return value from the datepicker popup is : ' + val, new Date(val));
//       $scope.newEventData.displayDate = new Date(val);
//       $scope.newEventData.dateOnly = new Date(val);
//       $scope.newEventData.dateOnly = $filter('date')(new Date(), 'yyyy-MM-dd');
//       //console.log($scope.newEventData.dateOnly);
//     },
//     disabledDates: [],
//     from: new Date(2016, 1, 1), //Optional
//     to: new Date(2020, 10, 30), //Optional
//     inputDate: new Date(), //Optional
//     mondayFirst: true, //Optional
//     //showTodayButton: true,
//     dateFormat: 'yy-M-dd',
//     // disableWeekdays: [0],       //Optional
//     closeOnSelect: false, //Optional
//     templateType: 'popup' //Optional
//   };
//
//   $scope.openDatePicker = function() {
//     ionicDatePicker.openDatePicker(ipObj1);
//   };
//   // ****************************************************************
//   var ipObj2 = {
//     callback: function(val) { //Mandatory
//       if (typeof(val) === 'undefined') {
//         console.log('Time not selected');
//       } else {
//         var selectedTime = new Date(val * 1000);
//       //  console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
//         $scope.newEventData.displayHour = selectedTime.getUTCHours();
//         if(selectedTime.getUTCMinutes()<10) {
//           var myMinute = '0' + selectedTime.getUTCMinutes();
//           $scope.newEventData.displayMinute = myMinute;
//         } else {
//             $scope.newEventData.displayMinute = selectedTime.getUTCMinutes();
//         }
//           $scope.newEventData.timeOnly = selectedTime.getUTCHours() + ":" + $scope.newEventData.displayMinute;
//           console.log($scope.newEventData.timeOnly);
//       }
//     },
//     inputTime: 50400, //Optional
//     format: 24, //Optional
//     step: 10, //Optional
//     setLabel: 'Set' //Optional
//   };
//
//   $scope.openTimePicker = function() {
//   ionicTimePicker.openTimePicker(ipObj2);
//   };

// ****************************************************************
  $scope.show = function() {
    $ionicLoading.show({
      templateUrl:"templates/loading.html"
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide()
  };
// ****************************************************************
  $scope.logOut = function() {
    $scope.authorized = false;
    window.localStorage.removeItem("Token");
    $scope.show();

    $timeout(function() {
      $scope.hide();
      $state.go('login');
    }, 500);
  };
// ****************************************************************
  // $ionicModal.fromTemplateUrl('templates/newevent.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });
})

// **********************************************************
// controller event in events
// **********************************************************

.controller('EventCtrl', function($scope, $stateParams) {
  //$scope.eventsId = $stateParams;
})

// **********************************************************
// list of events and load more
// **********************************************************

.controller('EventsCtrl', function($scope, $http, $rootScope, $timeout , $ionicLoading) {

  $scope.show = function() {
    $ionicLoading.show({
      templateUrl:"templates/loading.html"
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide()
  };
  $scope.show();
  $timeout(function() {
    $scope.hide();
  }, 10);

  //
  // var config = {
  //               headers : {
  //                   'Accept': 'application/json;',
  //                   'Authorization' : 'bearer' + window.localStorage['Token']
  //               }
  //           };
  //         $http.get("http://localhost:8000/api/v1/tasks", config)
  //                         .then(function(response){
  //                            var tasks = response.data.data;
  //                            $scope.tasks = tasks;
  //             });

  $scope.doRefresh = function() {
    // Subtract from the value of the first item ID to get the new one.
    // for (var i = 1; i <= 5; i++) {
    //   // var newId = $scope.items[0].id - 1;
    //   // $scope.items.unshift({
    //   //   id: newId
    //   });
    // }
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.loadMore = function() {
    var itemsLength = $scope.items.length;
    for (var i = itemsLength; i < itemsLength + 6; i++) {
      // $scope.items.push({
      //   id: $scope.items.length
      // });
    }

    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  $scope.moreDataCanBeLoaded = function() {
    // return $scope.items.length <= 100;
  };

  $scope.favorite = function(item) {
    alert('Favorite Item: ' + item.id);
  };
  $scope.notify = function(item) {
    alert('Notify Item: ' + item.id);
  };

});
