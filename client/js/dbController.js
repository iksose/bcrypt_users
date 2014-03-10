angular.module('uiRouterSample')
.controller("dbController" ,function ($scope, $state, $http) {
    console.log("Hello from dbController", $state)
    

    var saveMovie = function(obj){
            return $http.post("/movies", obj)
    }

    var getMovies = function(){
        return $http.get("secure/admin/movies")
    }

    getMovies().success(handleSuccess2)

    function handleSuccess2(data, status){
        console.log(data, status)
        $scope.movieList = data;
    }

    //MOVIES on MONGOOSE :

    $scope.movieList = [];


    function handleSuccess2(data, status){
        console.log(data, status)
        $scope.movieList = data;
    }

    $scope.movieModel = {
        title: "",
        rating: "XXX"
    }
    $scope.AddMovie = function(){
        console.log("ADDING", $scope.movieModel )
        wineFactory.saveMovie($scope.movieModel).
            success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("SUCCESS", status, data.error)
            }).
            error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("ERROR", status, data.ErrorMsg)
            });
    }
    

});