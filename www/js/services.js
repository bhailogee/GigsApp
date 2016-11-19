  angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */

  .service('LoginService',['$q','dataService', function($q,dataService) {
    return {
      loginUser: function(name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        dataService.remote.findOne({username:name,password:pw},dataService.collections.users).then(function(result){
          deferred.resolve('Welcome ' + name + '!');
        },function(){
          deferred.reject('Wrong credentials.');
        });
        return promise;
      }
    }
  }])
    .service('PerformanceService',['$q','dataService', function($q,dataService) {
        this.get = function (eventId) {
          return dataService.remote.find({eventid: eventId}, 'performances');
        };

      this.save=function(prf){
        return dataService.upsert(prf, 'performances');
      };

      this.delete = function(prf) {
        return dataService.delete(prf, 'performances');
      }
    }])

    .service('ParticipantsService',['$q','dataService', function($q,dataService) {
      this.get = function (eventId) {
        return dataService.remote.find({eventid: eventId}, 'participants');
      }
      this.save=function(par){
        return dataService.upsert(par, 'participants');
      };

    }]);
