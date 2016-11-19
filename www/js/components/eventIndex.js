/**
 * Created by Waseem on 11/19/2016.
 */
(function (angular) {
  var scripts = document.getElementsByTagName("script")
  var currentScriptPath = scripts[scripts.length - 1].src;


  angular.module('starter.directives',[])
    .directive('eventIndexDirective', ['EventService',function (EventService) {

      return {
        templateUrl:'templates/event-index.html',
        controller: function ($scope,EventService) {
          EventService.all().then(function(result){
            $scope.events = result;
          });
        }
        /*,
        scope: {
          viewObject: "=",    // Priority 1
          viewName: "@",      // Priority 2
          updateProcName: "@", // Priority 3
          showasmodal: "@",
          dashboard: "=",
          params:"="
        }*/
      };

    }])
  .filter('dateToISO', function() {
    return function(input) {
      if(input)
      {
        input = new Date(input).toLocaleDateString();
        return input;
      }
    };
  })
    .service('EventService', ['dataService', function (dataService) {
      this.all = function () {
        return dataService.remote.find({}, 'events');
      }
      this.get = function (eventId) {
        // Simple index lookup
        return dataService.remote.find({_id:eventId}, 'events').then(function(result){
          return result[0];
        });
      }
      this.getPerformances = function (eventId) {

        var performance = [
          {pid: 1, name: "John Doe"},
          {pid: 2, name: "Zoe Doe"},
          {pid: 3, name: "Ali"},
          {pid: 4, name: "Ahmed"},
          {pid: 5, name: "Shahid"}
        ];

        return performance;
      }
      this.deleteEventPerformance = function (eventID, performanceID) {
      }
    }]);

})(window.angular);
