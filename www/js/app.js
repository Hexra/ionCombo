// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'ionic-datepicker','ionic-timepicker', 'ionic-numberpicker'])

.run(function($ionicPlatform, $state, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if (window.localStorage.getItem("IntroDone") == 1) {
    //  console.log('Intro cleared');
        if(window.localStorage.getItem("Token") == undefined){
              $state.go('login');
        }else {
          $state.go('app.events');

        }
    }
  });
})



.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Set the title in middle
  $ionicConfigProvider.navBar.alignTitle('center');

  $stateProvider

  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })


  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'tab-search': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'tab-profile': {
        templateUrl: "templates/profile.html"
      }
    }
  })

  .state('app.myevents', {
    url: "/myevents",
    cache: false,
    views: {
      'tab-profile': {
        templateUrl: "templates/myevents.html",
        controller: 'MyEventsCtrl'
      }
    }
  })

  .state('app.myevent', {
    url: "/myevents/:eventId",
    views: {
      'tab-profile': {
        templateUrl: "templates/myevent.html",
        controller: 'MyEventCtrl'
      }
    }
  })

  .state('app.events', {
    url: "/events",
    cache: false,
    views: {
      'tab-browse': {
        templateUrl: "templates/events.html"
      }
    }
  })

  .state('app.playlists', {
    url: "/playlists",
    views: {
      '##': {
        templateUrl: "templates/playlists.html",
        controller: 'PlaylistsCtrl'
      }
    }
  })



    .state('app.single', {
      url: "/event/:eventId",
      views: {
        'tab-browse': {
          templateUrl: "templates/event.html",
          controller: 'EventCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
