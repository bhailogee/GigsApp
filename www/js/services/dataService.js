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
      attachServices:function(collectionName) {
        this.upsert = function (data) {
          if(!data._id)
          {
            data._id = utils.createUid();
          }
          var deferred = $q.defer();
          db[collectionName].upsert(data, function () {
            deferred.resolve(data._id);
            hybridDb.upload(function () {
            });
          });
          return deferred.promise;
        }
        this.delete = function (data) {
          var deferred = $q.defer();
          db[collectionName].remove(data._id, function () {
            deferred.resolve();
            hybridDb.upload(function () {

            });
          });
          return deferred.promise;
        }
        this.findOne = function (data) {
          var deferred = $q.defer();

          db[collectionName].findOne(data, {}, function (res) {
            if (res) {
              deferred.resolve(res);
            }
            else {
              deferred.reject();
            }
          });
          return deferred.promise;
        }
        this.find = function (data) {
          var deferred = $q.defer();
          var promise = deferred.promise;
          return db[collectionName].find(data||{});
        }
        this.remote = {
          findOne: function (data) {
            var deferred = $q.defer();
            var remote = remoteDb[collectionName].findOne(data, function (res) {
              if (res) {
                deferred.resolve(res);
              }
              else {
                deferred.reject();
              }
            });
            return deferred.promise;
          },
          find: function (data) {
            var deferred = $q.defer();
            var remote = remoteDb[collectionName].find(data||{});
            remote.fetch(function (res) {
              if (res) {
                deferred.resolve(res);
              }
              else {
                deferred.reject();
              }
            });
            return deferred.promise;
          },
          findByID:function(_id){
            var deferred = $q.defer();
            var remote = remoteDb[collectionName].findOne({_id:_id}, function (res) {
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
      },
      sync: function () {
        hybridDb.upload();
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

