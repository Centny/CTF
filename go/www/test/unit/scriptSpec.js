describe("Unit: Testing Controllers", function() {

  beforeEach(angular.mock.module('CTF'));

  it('should have a MainCtrl controller', function() {
    expect(CTF.MainCtrl).not.toBe(null);
  });

  it('should have a BookCtrl controller', function() {
    expect(CTF.BookCtrl).not.toBe(null);
  });

  it('should have a properly working MainCtrl controller', inject(function($rootScope, $controller, $httpBackend) {
  	// $httpBackend.when('GET', 'listBk').respond(null);
  	var data={
  		code:0,
  		data:[
  			{
    			id:"1",
    			name:"sss"
    		}	
  		]
  	}
  	$httpBackend.expectGET('listBk').respond(data);
    var $scope = $rootScope.$new();
    var ctrl = $controller('MainCtrl', {
      $scope : $scope,
      $routeParams : {}
    });
    $httpBackend.flush();
    expect(ctrl.items.length).toBe(data.data.length);
    expect($scope.onClkItem).not.toBe(null);
    $scope.onClkItem({
    	id:"1",
    	name:"sss"
    })
  }));
  it('should have a response check', inject(function($rootScope, $controller, $httpBackend) {
  	$httpBackend.expectGET('listBk').respond({});
    var $scope = $rootScope.$new();
    var ctrl = $controller('MainCtrl', {
      $scope : $scope,
      $routeParams : {}
    });
    $httpBackend.flush();
    expect(ctrl.items).toBe(undefined);
  }));
});
