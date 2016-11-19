angular.module('starter.controllers', [])


// A simple controller that shows a tapped item's data
.controller('EventDetailCtrl', function($scope, $stateParams, EventService,PerformanceService,ParticipantsService) {
    // "Events" is a service returning mock data (services.js)
    EventService.get($stateParams.eventId).then(function (result) {
      $scope.event = result;
    });

    $scope.typesList = [
      {value : "University", id : "University"},
      {value : "College", id : "College"},
      {value : "School", id : "School"}
    ];

    PerformanceService.get($stateParams.eventId).then(function(performances){
      $scope.performances = performances;
    });

    ParticipantsService.get($stateParams.eventId).then(function(participants){
      $scope.participants = participants;
    });

    $scope.updatePerformance=function(prf){

      prf.__update=!prf.__update;
      if(!prf.__update)
      {
        PerformanceService.save(prf);
      }

    }
    $scope.deletePerformance=function(prf) {
      prf.__deleted = true;
      PerformanceService.delete(prf);
    }


  })

.controller('LoginCtrl', function($scope,LoginService, $ionicPopup, $state) {
  $scope.data = {};

    $scope.login = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password).then(function (data) {
        $state.go('tab.event-index');
      }, function (data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    }
})

// A simple controller that shows performance data
.controller('EventPerformanceCtrl', function($scope, $stateParams, EventService) {
  // "Events" is a service returning mock data (services.js)
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder= false;
    $scope.listCanSwipe = true;
    $scope.performances = EventService.getPerformances($stateParams.eventId);

    $scope.edit=function(item){
      debugger;
    }
    $scope.deleteEventPerformance = EventService.deleteEventPerformance;
})

.controller('IndexCtrl', function($scope, $state) {
    $scope.onLogout = function(){
      $state.go('login');
    }
});