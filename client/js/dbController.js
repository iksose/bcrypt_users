angular.module('uiRouterSample')
.controller("dbController" ,function ($scope, $state, $http, loginFactory) {
    console.log("Hello from dbController", $state)
    

    var saveMovie = function(obj){
        return $http.post("secure/admin/movies", obj)
    }

    var getMovies = function(){
        return $http.get("secure/admin/movies")
    }

    getMovies().success(handleSuccess2)


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
        saveMovie($scope.movieModel).
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


    $scope.login = function(){
        console.log("Logging in...", $scope.credentials)
        var credits = $scope.credentials
        loginFactory.postLogin(credits)
    }

    function handleSuccess(data, status){
        console.log("Success....", data, status)
    }

    $scope.credentials = {}

    

});

angular.module('uiRouterSample')
    // A RESTful factory for retreiving contacts from 'contacts.json'

.factory('loginFactory', function($http){
    console.log("Hello from login Factory")
    var currentUser;
    return {
        postLogin: function(loginInfo) {
            console.log("POST DUDE", loginInfo)
            $http({
                method: 'POST',
                url: '/dmz/login',
                // data: params,
                params: loginInfo,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
            })
            .success(function(data, status){
                console.log("SUCCESS!!!", data, status)
                currentUser = data.user
            })
            .error(function(data, status){
                console.log("Failure...", data, status)
            })
        }
    }
    })