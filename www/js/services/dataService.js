/**
 * Created by Waseem on 11/17/2016.
 */

angular.module('starter.services')
  .factory('dataService',function($q) {

    var minimongo = require('minimongo');
    var LocalDb = minimongo.LocalStorageDb;
    var utils = minimongo.utils;
// Create local db (in memory database with no backing)
    var db = new LocalDb();
    var remoteDb = new minimongo.RemoteDb("http://202.142.174.203:3000/api/", {});
    /*var remoteDb = new minimongo.RemoteDb("http://127.0.0.1:3000/api/",{});*/

    var collections = {
      events: "events", files: "files", participants: "participants", performances: "performances", users: "users"
    };
    var collectionKeys = Object.keys(collections);

    var collectionModels = {
      events: {
        _id: "",
        eventtitle: "",
        address: "",
        type: "",
        institutename: "",
        eventdate: ""
      },
      files: {
        _id: "",
        eventid: "",
        image: {}
      },
      participants: {
        _id: "",
        eventid: "",
        Name: "",
        Gender: ""
      },
      performances: {
        _id: "",
        eventid: "",
        title: ""
      },
      users: {
        _id: "",
        name: "",
        username: "",
        password: "",
        imei: ""
      }
    }
    for (var ii = 0; ii < collectionKeys.length; ii++) {
      db.addCollection(collectionKeys[ii]);
      remoteDb.addCollection(collectionKeys[ii]);
    }

    var hybridDb = new minimongo.HybridDb(db, remoteDb);
    for (var ii = 0; ii < collectionKeys.length; ii++) {
      hybridDb.addCollection(collectionKeys[ii]);
    }

    return {
      collections: collections,
      collectionModels: collectionModels,
      createModel: function (collectionName) {
        var newObject = new JSON.parse(JSON.stringify(model[collectionName]));
        newObject.__collection = collectionName;
        Object.preventExtensions(newObject);
        return newObject;
      },
      upsert: function (data, collectionName) {
        var deferred = $q.defer();
        db[data.__collection || collectionName].upsert(data, function () {
          deferred.resolve();
          hybridDb.upload(function(){

          });
        });
        return deferred.promise;
      },
      delete: function (data, collectionName) {
        var deferred = $q.defer();
        db[data.__collection || collectionName].remove(data._id,function(){
          deferred.resolve();
          hybridDb.upload(function(){

          });
        });
        return deferred.promise;
      },
      findOne: function (data, collectionName) {
        var deferred = $q.defer();

        db[data.__collection || collectionName].findOne(data, {}, function (res) {
          if (res) {
            deferred.resolve(res);
          }
          else {
            deferred.reject();
          }
        });
        return deferred.promise;
      },
      find: function (data, collectionName) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        return db[data.__collection || collectionName].find(data);
      },
      sync: function () {
        hybridDb.upload();
      },
      remote: {
        findOne: function (data, collectionName) {
          var deferred = $q.defer();
          var remote = remoteDb[data.__collection || collectionName].findOne(data, function (res) {
            if (res) {
              deferred.resolve(res);
            }
            else {
              deferred.reject();
            }
          });
          return deferred.promise;
        },
        find: function (data, collectionName) {
          var deferred = $q.defer();
          var remote = remoteDb[data.__collection || collectionName].find(data);
          remote.fetch(function (res) {
            if (res) {
              deferred.resolve(res);
            }
            else {
              deferred.reject();
            }
          });
          return deferred.promise;
        }
      }
    };
  });





// Always use upsert for both inserts and modifies
//db.events.upsert(doc, function() {
// Success:

// Query dog (with no query options beyond a selector)
/*  hybridDb.events.findOne({  name: "Bingo" }, {}, function(res) {
 console.log("Dog's name is: " + res.name);
 hybridDb.upload();
 });*/
/*

var a = hybridDb.events.find({  name: "Bingo" }, {}, function(res) {
  console.log("Dog's name is: " + res.name);
  hybridDb.upload();
});
*/

