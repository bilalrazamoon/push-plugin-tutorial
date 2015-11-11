angular.module('starter.controller', [])
	.controller('HomeCtrl',function ($scope, $rootScope, $cordovaPushV5) {

	    //notification events
	    $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
	      console.log(data)
	      $scope.lastNotification=data;
	    });
	    $rootScope.$on('$cordovaPushV5:errorOccurred',function(event, err){
	      console.log(err)
	      $scope.error=err;
	    });

	    //Basic registration
	    $scope.pushRegister = function () {
	      console.log('Registering...');
	      $cordovaPushV5.register()
	      	.then(function (deviceToken) {
		        $scope.token = deviceToken;
		     });
	    };
	    $scope.pushUnRegister = function () {
	      console.log('UnRegistering...');
	      $cordovaPushV5.unregister()
	      	.then(function (deviceToken) {
		        $scope.token = ''
		     });
	    };
	})