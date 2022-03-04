
var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);


myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider
    .when('/home', {
      templateUrl: 'app/views/home.html',
      controller: 'NinjaController'
    })
    .when('/contact', {
      templateUrl: 'app/views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact-success', {
      templateUrl: 'app/views/contact-success.html',
      controller: 'ContactController'
    })
    .when('/directory', {
      templateUrl: 'app/views/directory.html',
      controller: 'NinjaController'
    })
    .otherwise({
      redirectTo: '/home'
    });

}]);



myNinjaApp.directive('randomNinja', [function(){

  return {
    
    restrict: 'E',
    
    scope: {
      ninjas: '=',  
      title: '='
    },
    
    templateUrl: 'app/views/random.html',
    
    transclude: true,
    
    replace: true,
    
    controller: function($scope) {

      
      $scope.random = Math.floor(Math.random() * 4);
    }
  };

}]);



myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http){

  
  $scope.removeNinja = function(ninja) {

    
    var removedNinja = $scope.ninjas.indexOf(ninja);

    
    $scope.ninjas.splice(removedNinja, 1);
  };


  
  $scope.addNinja = function() {

    $scope.ninjas.push({
      name: $scope.newNinja.name,
      belt: $scope.newNinja.belt,
      rate: parseInt($scope.newNinja.rate),  
      available: true
    });

    $scope.newNinja = {};  
  };

  
  $scope.removeAll = function() {

    
    $scope.ninjas = [];
  };

  
  $http.get('app/data/ninjas.json').then(
    function(response){
      $scope.ninjas = response.data;
    },
    function(error) {
      console.log("Error message: ", error);
    }
  );

}]);



myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location) {

  $scope.sendMessage = function() {

    
    $location.path('/contact-success');

  };

}]);