cortrollerModule.controller('MyEventsCtrl', function($scope,$filter, $ionicModal, $timeout, $state, $ionicLoading, ionicDatePicker, ionicTimePicker, $http, $ionicPopup) {
$scope.newEventData = {};
  //$scope.myEventData = {};
  //load on enter view
$scope.showMyEvents = function() {

  $scope.show();
    var config = {
                    headers : {
                        'Accept': 'application/json;',
                        'Authorization' : 'bearer' + window.localStorage['Token']
                    }
                };
              $http.get("http://localhost:8000/api/v1/events/?me=true", config)
                              .then(function(response){
                              var events = response.data;
                              //console.log(events);
                              $scope.myevents = events;
                              $scope.hide();
                  });
}

$scope.showMyEvents();

  $scope.doCreateEvent = function() {
    $scope.show();
    var config = {
      headers: {
        'Accept': 'application/json;',
        'Authorization' : 'bearer' + window.localStorage['Token']
        //'Content-Type': 'multipart/form-data;'
      }
    };
    $http.post("http://localhost:8000/api/v1/events/", {
      'title' : $scope.newEventData.title,
      'description' : $scope.newEventData.description,
      'participant' : $scope.newEventData.participant,
      'contact_number' : $scope.newEventData.contact,
      'location' : $scope.newEventData.location,
      'time' : $scope.newEventData.timeOnly,
      'event_date_start' : $scope.newEventData.dateOnly,
      'event_duration' : $scope.newEventData.duration,
    }, config)

    .success(function(response) {
        console.log(response.title);
        console.log(response.description);
        console.log(response.participant);
        console.log(response.contact_number);
        console.log(response.event_date_start);
        console.log(response.location);
        console.log(response.event_duration);
        console.log(response.user_id);
        $scope.hide();
        $scope.modal.hide();
        $scope.newEventData = {};
        $scope.showMyEvents();
      })
      .error(function(error) {
        $scope.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Oops..',
          template: error.errors
        });

      });

  }
  // *************************************************************
  $scope.numberPickerObject = {
      inputValue: 1, //Optional
      minValue: 1,
      maxValue: 9,
      // decimalCharacter: '.',  //Optional
      // decimalStep: 0.25,  //Optional
      format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL"
      // titleLabel: 'Number Picker',  //Optional
      setLabel: 'Set',  //Optional
      closeLabel: 'Close',  //Optional
      setButtonType: 'button-balanced',  //Optional
      closeButtonType: 'button-balanced',  //Optional
      callback: function (val) {    //Mandatory
          $scope.newEventData.duration = val;
      }
  };
  // *************************************************************
    var ipObj1 = {
      callback: function(val) { //Mandatory
      //  console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.newEventData.displayDate = new Date(val);
        $scope.newEventData.dateOnly = new Date(val);
        $scope.newEventData.dateOnly = $filter('date')(new Date(val), 'yyyy-MM-dd');
        console.log($scope.newEventData.dateOnly);
        //console.log(new Date(val));
      },
      disabledDates: [],
      from: new Date(2016, 1, 1), //Optional
      to: new Date(2020, 10, 30), //Optional
      inputDate: new Date(), //Optional
      mondayFirst: true, //Optional
      //showTodayButton: true,
      dateFormat: 'dd MMM yyyy',
      // disableWeekdays: [0],       //Optional
      closeOnSelect: false, //Optional
      templateType: 'popup' //Optional
    };

    $scope.openDatePicker = function() {
      ionicDatePicker.openDatePicker(ipObj1);
    };
    // ****************************************************************
    var ipObj2 = {
      callback: function(val) { //Mandatory
        if (typeof(val) === 'undefined') {
          console.log('Time not selected');
        } else {
          var selectedTime = new Date(val * 1000);
        //  console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
          $scope.newEventData.displayHour = selectedTime.getUTCHours();
          if(selectedTime.getUTCMinutes()<10) {
            var myMinute = '0' + selectedTime.getUTCMinutes();
            $scope.newEventData.displayMinute = myMinute;
          } else {
              $scope.newEventData.displayMinute = selectedTime.getUTCMinutes();
          }

          if(selectedTime.getUTCHours()<10) {
            var myHour = '0' + selectedTime.getUTCHours();
            $scope.newEventData.displayHour = myHour;
          } else {
              $scope.newEventData.displayHour = selectedTime.getUTCHours();
          }
            $scope.newEventData.timeOnly = $scope.newEventData.displayHour + ":" + $scope.newEventData.displayMinute;
            console.log($scope.newEventData.timeOnly);
        }
      },
      inputTime: 32400, //Optional
      format: 24, //Optional
      step: 10, //Optional
      setLabel: 'Set' //Optional
    };

    $scope.openTimePicker = function() {
    ionicTimePicker.openTimePicker(ipObj2);
    };

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

    $ionicModal.fromTemplateUrl('templates/newevent.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      //console.log($scope.myevent);
    });
  })


.controller('MyEventCtrl', function($scope, $stateParams) {
  $scope.thisEvent = {};
  var thisEvent = $stateParams;
  $scope.thisEvent = (JSON.parse(thisEvent.eventId));

})
