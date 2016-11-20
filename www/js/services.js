  angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */

  .service('LoginService',['$q','UserService', function($q,UserService) {
    return {
      loginUser: function(name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        UserService.remote.findOne({username:name,password:pw}).then(function(result){
          deferred.resolve('Welcome ' + name + '!');
        },function(){
          deferred.reject('Wrong credentials.');
        });
        return promise;
      }
    }
  }])
    .service('UserService', ['dataService', function (dataService) {
      dataService.attachServices.call(this,'users');
    }])
    .service('EventService', ['dataService', function (dataService) {
      dataService.attachServices.call(this,'events');


      /*this.all = function () {
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
      this.delete = function(e) {
        return dataService.delete(e, 'events');
      }


      this.save=function(e)
      {
        return dataService.save(e,'events');
      }

      this.deleteEventPerformance = function (eventID, performanceID) {
      }*/
    }])

  .service('PerformanceService',['$q','dataService', function($q,dataService) {
      var service = this;
      dataService.attachServices.call(this,'performances');

      service.getByEventID=function(eventId) {
        return service.remote.find({eventid: eventId});
      };

        /*this.get = function (eventId) {
          return dataService.remote.find({eventid: eventId}, 'performances');
        };

      this.save=function(prf){
        return dataService.upsert(prf, 'performances');
      };

      this.delete = function(prf) {
        return dataService.delete(prf, 'performances');
      }*/
    }])

    .service('ParticipantsService',['$q','dataService', function($q,dataService) {
      dataService.attachServices.call(this,'participants');
      var service = this;
      service.getByEventID=function(eventId) {
        return service.remote.find({eventid: eventId});
      };
    }]);


      /*this.get = function (eventId) {
        return dataService.remote.find({eventid: eventId}, 'participants');
      }
      this.save=function(par){
        return dataService.upsert(par, 'participants');
      };
*/
