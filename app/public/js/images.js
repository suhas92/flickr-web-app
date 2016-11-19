
var app = angular.module('demo', []);

app.controller('ImagesController', ['$scope', '$http',
    function ImagesController($scope, $http) {
        console.log('data');
        const options = {
            url: '/getImages',
            method: 'GET',
            params: {
                format: 'json',
                nojsoncallback: 1
            }
        };

        $http(options)
            .then((res) => {
                $scope.imageJSON = res.data;
            })
            .catch((err) => {
                console.log('Error in loading images:', err.data);
            });
}]);
