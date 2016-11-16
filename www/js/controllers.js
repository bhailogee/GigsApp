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

.controller('LoginCtrl', function($scope,LoginService, $ionicPopup, $state) {
  $scope.data = {};

    $scope.login = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
        $state.go('tab.event-index');
      }).error(function(data) {
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
})
.controller('MyCtrl', function($scope, $cordovaSQLite) {

  var db = $cordovaSQLite.openDB({ name: "my.db" });

  // for opening a background db:
  var db = $cordovaSQLite.openDB({ name: "my.db", bgType: 1 });

  $scope.execute = function() {
    var query = "INSERT INTO test_table (data, data_num) VALUES (?,?)";
    $cordovaSQLite.execute(db, query, ["test", 100]).then(function(res) {
      console.log("insertId: " + res.insertId);
    }, function (err) {
      console.error(err);
    });
  };

});