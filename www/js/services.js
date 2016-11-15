angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('EventService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var events = [
    { id: 0, title: 'Undertow Sessions', description: '18th sep 2016' },
    { id: 1, title: 'Rockify Tonight', description: '25th sep 2016' },
    { id: 2, title: 'Islamabad Rock Festival', description: '2nd oct 2016' },
    { id: 3, title: 'String Festival', description: '9th nov 2016' }
  ];

  return {
    all: function() {
      return events;
    },
    get: function(eventId) {
      // Simple index lookup
      return events[eventId];
    },
    getPerformances:function(eventId){

      var performance = [
        {pid:1,name:"a"},
        {pid:2,name:"b"},
        {pid:3,name:"c"},
        {pid:4,name:"d"},
        {pid:5,name:"e"}
      ];

      return performance;
    },
    deleteEventPerformance:function(eventID,performanceID){
    }
  }
})
  .service('LoginService', function($q) {
    return {
      loginUser: function(name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        if (name == 'admin' && pw == 'admin') {
          deferred.resolve('Welcome ' + name + '!');
        } else {
          deferred.reject('Wrong credentials.');
        }
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }
  });
