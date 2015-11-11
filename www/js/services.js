angular.module('starter.services', [])

.factory('$cordovaPushV5',['$window', '$q', '$rootScope', '$timeout', function ($window, $q, $rootScope, $timeout) {

    var push;
    var options;
    return {
      initialize : function (opt) {
        options=opt;
      },
      register : function () {
        var q = $q.defer();
        if ($window.PushNotification == undefined) {
          q.reject(new Error('PushNotification is undefined'));
        } else {
          push = $window.PushNotification.init(options);
          push.on('notification', function (notification) {
            $rootScope.$broadcast('$cordovaPushV5:notificationReceived', notification);
          });
          push.on('error', function (error) {
            q.reject(error);
            $rootScope.$broadcast('$cordovaPushV5:errorOccurred', error);
          });
          push.on('registration', function (data) {
            q.resolve(data.registrationId);
          });
        }
        return q.promise;
      },
      unregister : function () {
        var q = $q.defer();
        if ($window.PushNotification == undefined) {
          q.reject(new Error('PushNotification is undefined'));
        }
        if(push == undefined){
          push = $window.PushNotification.init(options);
          push.on('notification', function (notification) {
            $rootScope.$broadcast('$cordovaPushV5:notificationReceived', notification);
          });
          push.on('error', function (error) {
            q.reject(error);
            $rootScope.$broadcast('$cordovaPushV5:errorOccurred', error);
          });
        }
        push && push.unregister(function (success) {
          q.resolve(success);
        },function (error) {
          q.reject(error)
        })
        return q.promise;
      },
      setBadgeNumber : function (number) {
        var q = $q.defer();
        if ($window.PushNotification == undefined) {
          q.reject(new Error('init must be called before any other operation'));
        } else {
          push.setApplicationIconBadgeNumber(function (success) {
            q.resolve(success);
          }, function (error) {
            q.reject(error);
          }, number);
        }
        return q.promise;
      }
    };
  }]);