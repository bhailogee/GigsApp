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

          $scope.doRefresh=function(){
            EventService.remote.find({}).then(function(result){
              $scope.events = result;
              $scope.$broadcast('scroll.refreshComplete');
            });
          }
          $scope.doRefresh();
        }
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
  });

})(window.angular);
