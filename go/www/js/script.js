var CTF=window.CTF=angular.module('CTF', ['ngRoute', 'ngAnimate'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/Book/:bookId', {
          templateUrl: 'tpl/book.html',
          controller: 'BookCtrl',
          controllerAs: 'book'
        });
  }])
  .controller('MainCtrl', ['$route', '$routeParams', '$location', "$http", "$scope",
    function($route, $routeParams, $location, $http, $scope) {
      this.$route = $route;
      this.$location = $location;
      this.$routeParams = $routeParams;
      $this=this;
      $http.get("listBk").success(function(data){
        if(data.code==0){
          $this.items=data.data;
        }else{
          console.log("response data error:"+data.msg)
        }
      });
      $scope.onClkItem=function(item){
        $location.path("/Book/"+item.id).search({name:item.name});
      }
  }])
  .controller('BookCtrl', ['$routeParams', function($routeParams) {
    this.name = $routeParams.name;
    this.params = $routeParams;
  }]);