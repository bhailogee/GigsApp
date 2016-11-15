// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])


.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller:'IndexCtrl'
    })

    // the event tab has its own child nav-view and history
    .state('tab.event-index', {
      url: '/events',
      views: {
        'events-tab': {
          templateUrl: 'templates/event-index.html',
          controller: 'EventIndexCtrl'
        }
      }
    })

    .state('tab.event-detail', {
      url: '/event/:eventId',
      views: {
        'events-tab': {
          templateUrl: 'templates/event-detail.html',
          controller: 'EventDetailCtrl'
        }
      }
    })

    .state('tab.create', {
      url: '/create',
      views: {
        'create-tab': {
          templateUrl: 'templates/create.html'
        }
      }
    })

    .state('tab.edit-performance', {
      url: '/performance/:pid',
      views: {
        'events-tab': {
          templateUrl: 'templates/event-performance.html'
        }
      }
    })

    .state('tab.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/about.html'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');


    $ionicConfigProvider.tabs.position('bottom');

});

