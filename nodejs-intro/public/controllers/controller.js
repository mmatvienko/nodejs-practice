var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

var refresh = function(){
	// GET request for data from server
	$http({
	  method: 'GET',
	  url: '/liftList'
	}).then(function successCallback(response) {
		$scope.liftList = response.data;
		$scope.lift = null;
	  }, function errorCallback(response) {});
};

refresh();

//add lift to list function POST request success message
	$scope.addLift = function(){
		if($scope.lift != null){
			$http({
				method: 'POST',
				url: '/liftList',
				data: $scope.lift
			}).then(function successCallback(response){
				refresh();
			});
		}
	};
//remove lift
	$scope.remove = function(id){
		$http.delete('/liftList/' + id).then(function successCallback(response){
			refresh();
		});
	}
//edit function
	$scope.edit = function(id){
		// GET request for data from server
		$http({
		  method: 'GET',
		  url: '/liftList/' + id
		}).then(function successCallback(response) {
			$scope.lift = response.data;
		});
	};
//update function 
	$scope.update = function(){
		if($scope.lift != null){	
			$http({
				method: 'PUT',
				url: '/liftList/' + $scope.lift._id,
				data: $scope.lift
			}).then(function successCallback(response){
				refresh();
			});
		}
	};
}]);	
