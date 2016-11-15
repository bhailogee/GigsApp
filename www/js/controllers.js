angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('EventIndexCtrl', function($scope, EventService) {
  // "Events" is a service returning mock data (services.js)
  $scope.events = EventService.all();
})


// A simple controller that shows a tapped item's data
.controller('EventDetailCtrl', function($scope, $stateParams, EventService) {
  // "Events" is a service returning mock data (services.js)
  $scope.event = EventService.get($stateParams.eventId);
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
});