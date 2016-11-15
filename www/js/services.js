angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('EventService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var events = [
    { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
    { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
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
