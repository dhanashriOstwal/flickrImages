var app = angular.module('myApp', []);
app.controller('appController', function($scope,$http, $window){	
	$scope.user=[];
	var log = [];
	var i = 0;
	var tempArr = [];
	var res = ""; 
	var n = 1;
    $scope.sortOrder = "key";
    
	$window.onload = function(){
		var i = 1;
		$scope.imgpaths = []
        $scope.ids=[]
        $scope.currentPage = 0;
        $scope.pageSize = 'all';
        $scope.display = true;
        
        // Displays the current page and the total number of pages
        $scope.numberOfPages=function(){
            return Math.ceil($scope.imgpaths.length/$scope.pageSize);                
        }
        
        //Receives the data in json format
		$http({
            method:"GET",
            url: "/flickr"
		}).then(function mySuccess(response) {
            var jsonString = response.data;
            //json data that has all images details
            $scope.imgJSON = jsonString.photos.photo; 
            
            //array of data to be used for displaying of images image
            angular.forEach($scope.imgJSON,function(value,key){
                $scope.ids.push(parseInt(value.id)); 
                $scope.imgpaths.push({
                    key:(value.title),
                    value:'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '.jpg'
                });
            }); 
        })
	}
})

//filter for number of images to be displayed on a page 
app.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});