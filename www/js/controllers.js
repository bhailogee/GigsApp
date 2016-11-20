angular.module('starter.controllers', [])


// A simple controller that shows a tapped item's data
.controller('EventDetailCtrl', function($scope, $stateParams, EventService,PerformanceService,ParticipantsService,$state,ionicDatePicker) {
    // "Events" is a service returning mock data (services.js)

    var refreshEvent = function() {
      return EventService.remote.findByID($stateParams.eventId).then(function (result) {
        $scope.event = result;
      });
    }
    refreshEvent();

    $scope.deleteEvent=function(event){
      event.__deleted=true;
      EventService.delete(event);
      $state.go('tab.event-index');
    }

    var ipObj1 = {
      callback: function (val) {  //Mandatory
        $scope.event=$scope.event||{};
        $scope.event.eventdate =  new Date(val).toDateString();
      }
    };
    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.saveEvent=function(event){
      EventService.upsert(event);
      refreshEvent();
    }

    $scope.typesList = [
      {value : "University", id : "University"},
      {value : "College", id : "College"},
      {value : "School", id : "School"}
    ];
    var refreshPerformances = function(){
      return PerformanceService.getByEventID($stateParams.eventId).then(function(performances){
        $scope.performances = performances;
      });
    };
    refreshPerformances();

    $scope.addPerformance=function(newprf) {
      newprf.eventid =  $stateParams.eventId;
      PerformanceService.upsert(newprf).then(function () {
        refreshPerformances();
      });
    }
    $scope.updatePerformance=function(prf){
      prf.__update=!prf.__update;
      if(!prf.__update)
      {
        PerformanceService.upsert(prf);
      }
    }
    $scope.deletePerformance=function(prf) {
      prf.__deleted = true;
      PerformanceService.delete(prf);
    }

    var refreshParticipants = function() {
      return ParticipantsService.getByEventID($stateParams.eventId).then(function (participants) {
        $scope.participants = participants;
      });
    }

    refreshParticipants();

    $scope.addParticipant=function(newprf) {
      newprf.eventid =  $stateParams.eventId;
      ParticipantsService.upsert(newprf).then(function () {
        refreshParticipants();
      });
    }
    $scope.updateParticipant=function(prf){
      prf.__update=!prf.__update;
      if(!prf.__update)
      {
        ParticipantsService.upsert(prf);
      }
    }
    $scope.deleteParticipant=function(prf) {
      prf.__deleted = true;
      ParticipantsService.delete(prf).then(function(){
        refreshParticipants();
      });
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


$scope.showUUID=function() {
  var myPopup = $ionicPopup.alert({
    title: 'Device UUID!',
    template: 'Your device UUID is '+device.uuid
  });
}






})

/*// A simple controller that shows performance data
.controller('EventPerformanceCtrl', function($scope, $stateParams, PerformanceService) {
  // "Events" is a service returning mock data (services.js)
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder= false;
    $scope.listCanSwipe = true;
    PerformanceService.get($stateParams.eventId).then(function(result){
      debugger;
      $scope.performances =result;
    });

    $scope.editPerformance=function(prf){
      PerformanceService.save(prf);
    }
    $scope.deleteEventPerformance = EventService.deleteEventPerformance;
})*/
  .controller('CreateEventCtrl',function(EventService,$state,$scope,ionicDatePicker){
    $scope.event=null;
    $scope.saveEvent=function(event){

      EventService.upsert(event).then(function(result){
        $scope.event = null;
        $state.go('tab.event-detail',{"eventId":result});
      });
    }
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        $scope.event=$scope.event||{};
        $scope.event.eventdate =  new Date(val).toDateString();
      }
    };
    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };
  })
.controller('IndexCtrl', function($scope, $state) {
    $scope.onLogout = function(){
      $state.go('login');
    }
});